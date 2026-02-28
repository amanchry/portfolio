const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

try {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
} catch (_) {}

const SEED_DIR = path.join(__dirname, 'seed');
const JSON_PATH = path.join(SEED_DIR, 'ProjectsDetailsData.json');

const prisma = new PrismaClient();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER = 'projects';

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_BY_EXT[ext] || 'image/jpeg';
}

/** Resolve path relative to prisma/seed/ (e.g. images/projects/x.jpg or projects/x.jpg) to absolute path. */
function resolveSeedPath(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return null;
  // Strip leading slashes and normalize backslashes to forward
  const normalized = relativePath.trim().replace(/^\/+/, '').replace(/\\/g, '/');
  const absolutePath = path.join(SEED_DIR, normalized);
  // Ensure resolved path stays inside SEED_DIR (prevent path traversal)
  const realSeed = path.resolve(SEED_DIR);
  const realResolved = path.resolve(absolutePath);
  const relative = path.relative(realSeed, realResolved);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return realResolved;
}

/** Upload a local file from seed folder to Cloudinary. Returns secure_url or null. */
async function uploadLocalImage(relativePath) {
  const absolutePath = resolveSeedPath(relativePath);
  if (!absolutePath) {
    console.warn(`    [skip upload] invalid path: ${relativePath}`);
    return null;
  }
  if (!fs.existsSync(absolutePath)) {
    console.warn(`    [skip upload] file not found: ${relativePath}`);
    console.warn(`        resolved to: ${absolutePath}`);
    return null;
  }
  const buffer = fs.readFileSync(absolutePath);
  const mime = getMime(absolutePath);
  const base64 = `data:${mime};base64,${buffer.toString('base64')}`;
  try {
    const result = await cloudinary.uploader.upload(base64, { folder: FOLDER, resource_type: 'image' });
    return result.secure_url;
  } catch (err) {
    console.warn(`    [upload failed] ${relativePath}:`, err.message);
    return null;
  }
}

/** Upload path relative to seed dir; if already http URL, return as-is. Cache to avoid re-upload. */
async function uploadOrKeepUrl(urlOrPath, cache) {
  if (!urlOrPath || typeof urlOrPath !== 'string') return null;
  const trimmed = urlOrPath.trim();
  if (trimmed.startsWith('http')) return trimmed;
  if (cache.has(trimmed)) return cache.get(trimmed);
  const url = await uploadLocalImage(trimmed);
  if (url) cache.set(trimmed, url);
  return url || trimmed;
}

function toArray(val) {
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  if (typeof val === 'string') return val.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

async function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error(`Seed JSON not found: ${JSON_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(JSON_PATH, 'utf8');
  let items;
  try {
    items = JSON.parse(raw);
  } catch (err) {
    console.error('Invalid JSON in ProjectsDetailsData.json:', err.message);
    process.exit(1);
  }

  items = Array.isArray(items) ? items : [];
  items = items.slice().reverse(); // seed in reverse order (bottom of JSON first)
  console.log(`Seeding ${items.length} projects (images from prisma/seed/)...`);

  const uploadCache = new Map();

  for (const item of items) {
    const projectName = (item.ProjectName || item.projectName || '').toString().trim();
    if (!projectName) {
      console.warn('Skipping item with no ProjectName');
      continue;
    }

    const description = (item.Description || item.description || '').toString().trim() || projectName;
    const projectDateRaw = item.ProjectDate || item.projectDate;
    const projectDate = projectDateRaw ? new Date(projectDateRaw) : null;
    const tags = toArray(item.Tags || item.tags);
    const technology = toArray(item.Technology || item.technology);
    const imagePath = (item.Image || item.image || '').toString().trim() || 'images/placeholder.jpg';
    const carouselPaths = toArray(item.CarouselImages || item.carouselImages);
    const linkRaw = item.Link || item.link;
    const link = linkRaw != null && linkRaw !== '' ? String(linkRaw).trim() : null;

    const imageUrl = await uploadOrKeepUrl(imagePath, uploadCache);
    const carouselUrls = [];
    for (const p of carouselPaths.length ? carouselPaths : [imagePath]) {
      const u = await uploadOrKeepUrl(p, uploadCache);
      if (u) carouselUrls.push(u);
    }
    if (carouselUrls.length === 0 && imageUrl) carouselUrls.push(imageUrl);

    const data = {
      projectName,
      description,
      projectDate,
      tags: tags.length ? tags : [],
      technology: technology.length ? technology : [],
      image: imageUrl || imagePath,
      carouselImages: carouselUrls.length ? carouselUrls : [imageUrl || imagePath],
      link,
    };

    await prisma.project.upsert({
      where: { projectName },
      create: data,
      update: data,
    });
    console.log(`  ✓ ${projectName}`);
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
