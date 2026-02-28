import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { uploadBufferToCloudinary, deleteAllFromCloudinaryByUrls, getPublicIdFromUrl } from '@/lib/cloudinary';

function normalizeSlug(s) {
  return s?.trim()?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^a-z0-9-]/g, '') || '';
}

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session?.user?.admin;
    const { slug: raw } = await Promise.resolve(params);
    const slug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!slug) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    if (!blog) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }
    if (!isAdmin && blog.isPublished === false) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }
    return Response.json({
      id: blog.id,
      Title: blog.title,
      Slug: blog.slug,
      ShortDescription: blog.shortDescription,
      Content: blog.content,
      ContentMarkdown: blog.contentMarkdown || '',
      ContentFormat: blog.contentFormat || 'html',
      Thumbnail: blog.thumbnail,
      IsPublished: blog.isPublished !== false,
      PublishDate: blog.publishedAt,
    });
  } catch (err) {
    console.error('GET /api/blogs/[slug]:', err);
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT – update blog (admin only), multipart: title, slug, shortDescription, content/contentMarkdown, thumbnail (optional)
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug: raw } = await Promise.resolve(params);
    const currentSlug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!currentSlug) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }

    const existing = await prisma.blog.findUnique({ where: { slug: currentSlug } });
    if (!existing) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get('title')?.toString()?.trim();
    const newSlug = normalizeSlug(formData.get('slug')?.toString());
    const shortDescription = formData.get('shortDescription')?.toString()?.trim() || '';
    const rawContent = formData.get('content');
    const content = rawContent != null ? String(rawContent) : '';
    const contentMarkdown = formData.get('contentMarkdown')?.toString() || '';
    const contentFormat = contentMarkdown.trim() ? 'markdown' : 'html';
    const isPublished = (formData.get('isPublished')?.toString() ?? (existing.isPublished === false ? 'false' : 'true')) === 'true';

    if (!title || !newSlug) {
      return Response.json({ error: 'title and slug are required' }, { status: 400 });
    }

    if (newSlug !== currentSlug) {
      const taken = await prisma.blog.findUnique({ where: { slug: newSlug } });
      if (taken) {
        return Response.json({ error: 'A blog with this slug already exists' }, { status: 400 });
      }
    }

    let thumbnailUrl = existing.thumbnail;
    const thumbFile = formData.get('thumbnail');
    if (thumbFile && typeof thumbFile !== 'string') {
      const buffer = Buffer.from(await thumbFile.arrayBuffer());
      const mimeType = thumbFile.type || 'image/jpeg';
      const { url } = await uploadBufferToCloudinary(buffer, mimeType, 'blogs');
      thumbnailUrl = url;
    }

    const blog = await prisma.blog.update({
      where: { slug: currentSlug },
      data: {
        title,
        slug: newSlug,
        shortDescription,
        content: contentFormat === 'html' ? content : '',
        contentMarkdown: contentFormat === 'markdown' ? contentMarkdown : null,
        contentFormat,
        isPublished,
        thumbnail: thumbnailUrl,
      },
    });

    return Response.json({
      id: blog.id,
      Title: blog.title,
      Slug: blog.slug,
      ShortDescription: blog.shortDescription,
      Thumbnail: blog.thumbnail,
      PublishDate: blog.publishedAt,
      IsPublished: blog.isPublished !== false,
      Content: blog.content,
      ContentMarkdown: blog.contentMarkdown || '',
      ContentFormat: blog.contentFormat || 'html',
    });
  } catch (err) {
    console.error('PUT /api/blogs/[slug]:', err);
    return Response.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// PATCH – toggle publish state (admin only)
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug: raw } = await Promise.resolve(params);
    const slug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!slug) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    if (typeof body?.isPublished !== 'boolean') {
      return Response.json({ error: 'isPublished (boolean) is required' }, { status: 400 });
    }

    const blog = await prisma.blog.update({
      where: { slug },
      data: { isPublished: body.isPublished },
    });

    return Response.json({
      success: true,
      Slug: blog.slug,
      IsPublished: blog.isPublished !== false,
    });
  } catch (err) {
    console.error('PATCH /api/blogs/[slug]:', err);
    return Response.json({ error: 'Failed to update publish status' }, { status: 500 });
  }
}

// Extract Cloudinary image URLs from HTML content (img src)
function getCloudinaryUrlsFromHtml(html) {
  if (!html || typeof html !== 'string') return [];
  const urls = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    const src = m[1];
    if (getPublicIdFromUrl(src)) urls.push(src);
  }
  return urls;
}

function getCloudinaryUrlsFromMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') return [];
  const urls = [];
  const imageRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m;
  while ((m = imageRegex.exec(markdown)) !== null) {
    const src = m[1];
    if (getPublicIdFromUrl(src)) urls.push(src);
  }
  return urls;
}

// DELETE – delete blog (admin only); also deletes thumbnail and content images from Cloudinary
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { slug: raw } = await Promise.resolve(params);
    const slug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!slug) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }
    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (blog) {
      const urls = [
        blog.thumbnail,
        ...getCloudinaryUrlsFromHtml(blog.content),
        ...getCloudinaryUrlsFromMarkdown(blog.contentMarkdown),
      ].filter(Boolean);
      await deleteAllFromCloudinaryByUrls(urls);
    }
    await prisma.blog.delete({ where: { slug } }).catch(() => null);
    return Response.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/blogs/[slug]:', err);
    return Response.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
