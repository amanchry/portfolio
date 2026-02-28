import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

// GET – list all projects (public)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const mapped = projects.map((p) => ({
      id: p.id,
      ProjectName: p.projectName,
      Description: p.description,
      ProjectDate: p.projectDate,
      Tags: p.tags,
      Image: p.image,
      CarouselImages: p.carouselImages,
      Link: p.link || '',
      Technology: p.technology,
    }));
    return Response.json(mapped);
  } catch (err) {
    console.error('GET /api/projects:', err);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST – create project (admin only), multipart: fields + image + carouselImages[]
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const projectName = formData.get('projectName')?.toString()?.trim();
    const description = formData.get('description')?.toString()?.trim() || '';
    const projectDateRaw = formData.get('projectDate')?.toString()?.trim();
    const projectDate = projectDateRaw ? new Date(projectDateRaw) : null;
    const link = formData.get('link')?.toString()?.trim() || null;
    const tagsRaw = formData.get('tags');
    const technologyRaw = formData.get('technology');

    if (!projectName || !description) {
      return Response.json(
        { error: 'projectName and description are required' },
        { status: 400 }
      );
    }

    const tags = parseJsonArray(tagsRaw, ['']);
    const technology = parseJsonArray(technologyRaw, ['']);

    const imageFile = formData.get('image');
    if (!imageFile || typeof imageFile === 'string') {
      return Response.json({ error: 'Main image is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const mime = imageFile.type || 'image/jpeg';
    const { url: imageUrl } = await uploadBufferToCloudinary(buffer, mime, 'projects');

    const carouselUrls = [];
    const carouselFiles = formData.getAll('carouselImages');
    for (const file of carouselFiles) {
      if (typeof file === 'string') continue;
      const buf = Buffer.from(await file.arrayBuffer());
      const { url } = await uploadBufferToCloudinary(buf, file.type || 'image/jpeg', 'projects');
      carouselUrls.push(url);
    }
    if (carouselUrls.length === 0) carouselUrls.push(imageUrl);

    const existing = await prisma.project.findUnique({
      where: { projectName },
    });
    if (existing) {
      return Response.json(
        { error: 'A project with this name already exists' },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        description,
        projectDate,
        tags,
        image: imageUrl,
        carouselImages: carouselUrls,
        link,
        technology,
      },
    });

    return Response.json({
      success: true,
      project: {
        id: project.id,
        ProjectName: project.projectName,
        Description: project.description,
        ProjectDate: project.projectDate,
        Tags: project.tags,
        Image: project.image,
        CarouselImages: project.carouselImages,
        Link: project.link,
        Technology: project.technology,
      },
    }, { status: 201 });
  } catch (err) {
    console.error('POST /api/projects:', err);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

function parseJsonArray(value, fallback = []) {
  if (value == null || value === '') return fallback;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [String(value)];
    } catch {
      return value.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return fallback;
}
