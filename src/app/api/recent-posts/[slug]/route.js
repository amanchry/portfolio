import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { uploadBufferToCloudinary, deleteAllFromCloudinaryByUrls } from '@/lib/cloudinary';

function normalizeSlug(value) {
  return value?.trim()?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^a-z0-9-]/g, '') || '';
}

function mapPost(post) {
  return {
    id: post.id,
    Title: post.title,
    Slug: post.slug,
    ShortDescription: post.shortDescription,
    Thumbnail: post.thumbnail || null,
    Link: post.link || '',
    PublishDate: post.publishedAt,
    PostDate: post.postDate || null,
    Place: post.place || null,
  };
}

export async function GET(req, { params }) {
  try {
    const { slug: raw } = await Promise.resolve(params);
    const slug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!slug) {
      return Response.json({ error: 'Recent post not found' }, { status: 404 });
    }

    const post = await prisma.recentPost.findUnique({
      where: { slug },
    });
    if (!post) {
      return Response.json({ error: 'Recent post not found' }, { status: 404 });
    }

    return Response.json(mapPost(post));
  } catch (err) {
    console.error('GET /api/recent-posts/[slug]:', err);
    return Response.json({ error: 'Failed to fetch recent post' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug: raw } = await Promise.resolve(params);
    const currentSlug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!currentSlug) {
      return Response.json({ error: 'Recent post not found' }, { status: 404 });
    }

    const existing = await prisma.recentPost.findUnique({ where: { slug: currentSlug } });
    if (!existing) {
      return Response.json({ error: 'Recent post not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get('title')?.toString()?.trim();
    const newSlug = normalizeSlug(formData.get('slug')?.toString());
    const shortDescription = formData.get('shortDescription')?.toString()?.trim() || '';
    const link = formData.get('link')?.toString()?.trim() || null;
    const postDateRaw = formData.get('postDate')?.toString()?.trim();
    const postDate = postDateRaw ? new Date(postDateRaw) : null;
    const place = formData.get('place')?.toString()?.trim() || null;

    if (!title || !newSlug) {
      return Response.json({ error: 'title and slug are required' }, { status: 400 });
    }

    if (newSlug !== currentSlug) {
      const taken = await prisma.recentPost.findUnique({ where: { slug: newSlug } });
      if (taken) {
        return Response.json({ error: 'A recent post with this slug already exists' }, { status: 400 });
      }
    }

    let thumbnailUrl = existing.thumbnail;
    const thumbFile = formData.get('thumbnail');
    if (thumbFile && typeof thumbFile !== 'string') {
      const buffer = Buffer.from(await thumbFile.arrayBuffer());
      const mimeType = thumbFile.type || 'image/jpeg';
      const { url } = await uploadBufferToCloudinary(buffer, mimeType, 'recent-posts');
      thumbnailUrl = url;
    }

    const post = await prisma.recentPost.update({
      where: { slug: currentSlug },
      data: {
        title,
        slug: newSlug,
        shortDescription,
        link,
        thumbnail: thumbnailUrl,
        postDate,
        place,
      },
    });

    return Response.json(mapPost(post));
  } catch (err) {
    console.error('PUT /api/recent-posts/[slug]:', err);
    return Response.json({ error: 'Failed to update recent post' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug: raw } = await Promise.resolve(params);
    const slug = raw ? decodeURIComponent(raw).toLowerCase() : '';
    if (!slug) {
      return Response.json({ error: 'Recent post not found' }, { status: 404 });
    }

    const post = await prisma.recentPost.findUnique({ where: { slug } });
    if (post?.thumbnail) {
      await deleteAllFromCloudinaryByUrls([post.thumbnail]);
    }

    await prisma.recentPost.delete({ where: { slug } }).catch(() => null);
    return Response.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/recent-posts/[slug]:', err);
    return Response.json({ error: 'Failed to delete recent post' }, { status: 500 });
  }
}
