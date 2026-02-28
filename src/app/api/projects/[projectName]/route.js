import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { uploadBufferToCloudinary, deleteAllFromCloudinaryByUrls } from '@/lib/cloudinary';

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

export async function GET(req, { params }) {
  try {
    const { projectName: raw } = await Promise.resolve(params);
    const projectName = raw ? decodeURIComponent(raw) : '';
    if (!projectName) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    const project = await prisma.project.findUnique({
      where: { projectName },
    });
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    return Response.json({
      id: project.id,
      ProjectName: project.projectName,
      Description: project.description,
      ProjectDate: project.projectDate,
      Tags: project.tags,
      Image: project.image,
      CarouselImages: project.carouselImages,
      Link: project.link || '',
      Technology: project.technology,
    });
  } catch (err) {
    console.error('GET /api/projects/[projectName]:', err);
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT – update project (admin only)
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { projectName: raw } = await Promise.resolve(params);
    const currentName = raw ? decodeURIComponent(raw) : '';
    if (!currentName) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    const existing = await prisma.project.findUnique({ where: { projectName: currentName } });
    if (!existing) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const projectName = formData.get('projectName')?.toString()?.trim();
    const description = formData.get('description')?.toString()?.trim() || '';
    const projectDateRaw = formData.get('projectDate')?.toString()?.trim();
    const projectDate = projectDateRaw ? new Date(projectDateRaw) : null;
    const link = formData.get('link')?.toString()?.trim() || null;
    const tags = parseJsonArray(formData.get('tags'), existing.tags);
    const technology = parseJsonArray(formData.get('technology'), existing.technology);

    if (!projectName || !description) {
      return Response.json(
        { error: 'projectName and description are required' },
        { status: 400 }
      );
    }

    if (projectName !== currentName) {
      const taken = await prisma.project.findUnique({ where: { projectName } });
      if (taken) {
        return Response.json({ error: 'A project with this name already exists' }, { status: 400 });
      }
    }

    let imageUrl = existing.image;
    const imageFile = formData.get('image');
    if (imageFile && typeof imageFile !== 'string') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const { url } = await uploadBufferToCloudinary(buffer, imageFile.type || 'image/jpeg', 'projects');
      imageUrl = url;
    }

    let carouselUrls = existing.carouselImages;
    const carouselFiles = formData.getAll('carouselImages');
    if (carouselFiles.some((f) => typeof f !== 'string')) {
      carouselUrls = [];
      for (const file of carouselFiles) {
        if (typeof file === 'string') continue;
        const buf = Buffer.from(await file.arrayBuffer());
        const { url } = await uploadBufferToCloudinary(buf, file.type || 'image/jpeg', 'projects');
        carouselUrls.push(url);
      }
      if (carouselUrls.length === 0) carouselUrls = [imageUrl];
    }

    const project = await prisma.project.update({
      where: { projectName: currentName },
      data: {
        projectName,
        description,
        projectDate,
        tags,
        technology,
        image: imageUrl,
        carouselImages: carouselUrls,
        link,
      },
    });

    return Response.json({
      id: project.id,
      ProjectName: project.projectName,
      Description: project.description,
      ProjectDate: project.projectDate,
      Tags: project.tags,
      Image: project.image,
      CarouselImages: project.carouselImages,
      Link: project.link,
      Technology: project.technology,
    });
  } catch (err) {
    console.error('PUT /api/projects/[projectName]:', err);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE – delete project (admin only); also deletes images from Cloudinary
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { projectName: raw } = await Promise.resolve(params);
    const projectName = raw ? decodeURIComponent(raw) : '';
    if (!projectName) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    const project = await prisma.project.findUnique({ where: { projectName } });
    if (project) {
      const urls = [project.image, ...(project.carouselImages || [])].filter(Boolean);
      await deleteAllFromCloudinaryByUrls(urls);
    }
    await prisma.project.delete({ where: { projectName } }).catch(() => null);
    return Response.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/projects/[projectName]:', err);
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
