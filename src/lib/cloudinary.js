import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image buffer to Cloudinary (from FormData file)
 * @param {Buffer} buffer
 * @param {string} mimeType - e.g. 'image/jpeg'
 * @param {string} folder
 * @returns {Promise<{ url: string }>}
 */
export async function uploadBufferToCloudinary(buffer, mimeType = 'image/jpeg', folder = 'projects') {
  const base64 = `data:${mimeType};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: 'image',
  });
  return { url: result.secure_url };
}

const CLOUDINARY_URL_REGEX = /res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/(?:v\d+\/)?(.+)/;

/**
 * Extract Cloudinary public_id from a URL (without file extension).
 * @param {string} url
 * @returns {string | null}
 */
export function getPublicIdFromUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(CLOUDINARY_URL_REGEX);
  if (!match) return null;
  const path = match[1];
  const publicId = path.replace(/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i, '');
  return publicId || null;
}

/**
 * Delete an image (or asset) from Cloudinary by URL. No-op if URL is not Cloudinary.
 * @param {string} url
 * @param {{ resource_type?: 'image' | 'video' | 'raw' }} options
 * @returns {Promise<{ result: string } | null>} result or null if not a Cloudinary URL / skip
 */
export async function deleteFromCloudinaryByUrl(url, options = {}) {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) return null;
  const { resource_type = 'image' } = options;
  const result = await cloudinary.uploader.destroy(publicId, { resource_type });
  return result;
}

/**
 * Delete multiple Cloudinary assets by URL. Ignores non-Cloudinary URLs and errors.
 * @param {string[]} urls
 */
export async function deleteAllFromCloudinaryByUrls(urls) {
  const promises = (urls || [])
    .filter(Boolean)
    .map((url) => deleteFromCloudinaryByUrl(url).catch(() => {}));
  await Promise.all(promises);
}

export { cloudinary };
