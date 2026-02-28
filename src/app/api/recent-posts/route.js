import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

function normalizeSlug(value) {
  return value?.trim()?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^a-z0-9-]/g, '') || '';
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limitRaw = searchParams.get('limit');
    const limit = Number(limitRaw);

    const posts = await prisma.recentPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    const mapped = posts.map((p) => ({
      id: p.id,
      Title: p.title,
      Slug: p.slug,
      ShortDescription: p.shortDescription,
      Thumbnail: p.thumbnail || null,
      Link: p.link || '',
      PublishDate: p.publishedAt,
      PostDate: p.postDate || null,
      Place: p.place || null,
    }));

    // Sort by event date (post date if set, else publish date), newest first
    mapped.sort((a, b) => {
      const dateA = new Date(a.PostDate || a.PublishDate).getTime();
      const dateB = new Date(b.PostDate || b.PublishDate).getTime();
      return dateB - dateA;
    });

    const result = Number.isFinite(limit) && limit > 0
      ? mapped.slice(0, Math.min(limit, 20))
      : mapped;

    return Response.json(result);
  } catch (err) {
    console.error('GET /api/recent-posts:', err);
    return Response.json({ error: 'Failed to fetch recent posts' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title')?.toString()?.trim();
    const slug = normalizeSlug(formData.get('slug')?.toString());
    const shortDescription = formData.get('shortDescription')?.toString()?.trim() || '';
    const link = formData.get('link')?.toString()?.trim() || null;
    const postDateRaw = formData.get('postDate')?.toString()?.trim();
    const postDate = postDateRaw ? new Date(postDateRaw) : null;
    const place = formData.get('place')?.toString()?.trim() || null;

    if (!title || !slug) {
      return Response.json({ error: 'title and slug are required' }, { status: 400 });
    }

    const existing = await prisma.recentPost.findUnique({ where: { slug } });
    if (existing) {
      return Response.json({ error: 'A recent post with this slug already exists' }, { status: 400 });
    }

    let thumbnailUrl = null;
    const thumbFile = formData.get('thumbnail');
    if (thumbFile && typeof thumbFile !== 'string') {
      const buffer = Buffer.from(await thumbFile.arrayBuffer());
      const mimeType = thumbFile.type || 'image/jpeg';
      const { url } = await uploadBufferToCloudinary(buffer, mimeType, 'recent-posts');
      thumbnailUrl = url;
    }

    const post = await prisma.recentPost.create({
      data: {
        title,
        slug,
        shortDescription,
        link,
        thumbnail: thumbnailUrl,
        postDate,
        place,
      },
    });

    return Response.json(
      {
        id: post.id,
        Title: post.title,
        Slug: post.slug,
        ShortDescription: post.shortDescription,
        Thumbnail: post.thumbnail,
        Link: post.link || '',
        PublishDate: post.publishedAt,
        PostDate: post.postDate || null,
        Place: post.place || null,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/recent-posts:', err);
    return Response.json({ error: 'Failed to create recent post' }, { status: 500 });
  }
}
