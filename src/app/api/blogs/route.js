import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

// GET – list all blogs (public)
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session?.user?.admin;
    const includeAll = new URL(req.url).searchParams.get('all') === '1';

    const where = isAdmin && includeAll
      ? {}
      : {
          OR: [{ isPublished: true }, { isPublished: null }],
        };

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });
    const mapped = blogs.map((b) => ({
      id: b.id,
      Title: b.title,
      Slug: b.slug,
      ShortDescription: b.shortDescription,
      Thumbnail: b.thumbnail || null,
      ContentFormat: b.contentFormat || 'html',
      IsPublished: b.isPublished !== false,
      PublishDate: b.publishedAt,
    }));
    return Response.json(mapped);
  } catch (err) {
    console.error('GET /api/blogs:', err);
    return Response.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST – create blog (admin only), multipart: title, slug, shortDescription, content/contentMarkdown, thumbnail
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title')?.toString()?.trim();
    const slug = formData.get('slug')?.toString()?.trim()?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
    const shortDescription = formData.get('shortDescription')?.toString()?.trim() || '';
    const rawContent = formData.get('content');
    const content = rawContent != null ? String(rawContent) : '';
    const contentMarkdown = formData.get('contentMarkdown')?.toString() || '';
    const contentFormat = contentMarkdown.trim() ? 'markdown' : 'html';
    const isPublished = (formData.get('isPublished')?.toString() ?? 'true') === 'true';

    if (!title || !slug) {
      return Response.json({ error: 'title and slug are required' }, { status: 400 });
    }

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      return Response.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }

    let thumbnailUrl = null;
    const thumbFile = formData.get('thumbnail');
    if (thumbFile && typeof thumbFile !== 'string') {
      const buffer = Buffer.from(await thumbFile.arrayBuffer());
      const mimeType = thumbFile.type || 'image/jpeg';
      const { url } = await uploadBufferToCloudinary(buffer, mimeType, 'blogs');
      thumbnailUrl = url;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        shortDescription,
        content: contentFormat === 'html' ? content : '',
        contentMarkdown: contentFormat === 'markdown' ? contentMarkdown : null,
        contentFormat,
        isPublished,
        thumbnail: thumbnailUrl,
      },
    });

    return Response.json(
      {
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
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/blogs:', err);
    return Response.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
