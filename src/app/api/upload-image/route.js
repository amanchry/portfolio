import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

// POST – upload single image (admin only), for blog editor inline images
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('image') || formData.get('file');
    if (!file || typeof file === 'string') {
      return Response.json({ error: 'Image file required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || 'image/jpeg';
    const { url } = await uploadBufferToCloudinary(buffer, mimeType, 'blogs');
    // Editor.js Image tool expects this shape
    return Response.json({ success: 1, file: { url } });
  } catch (err) {
    console.error('POST /api/upload-image:', err);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
