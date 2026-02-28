import { prisma } from "@/lib/prisma";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

// Generate sitemap at request time so build does not require DB (Vercel build cannot reach MongoDB Atlas)
export const dynamic = "force-dynamic";

const staticRoutes = [
  { url: "", changefreq: "monthly", priority: 1 },
  { url: "/about", changefreq: "monthly", priority: 0.9 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/blogs", changefreq: "monthly", priority: 0.9 },
  { url: "/projects", changefreq: "monthly", priority: 0.8 },
];

const DB_TIMEOUT_MS = 4000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

export default async function sitemap() {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  let blogEntries = [];
  try {
    const blogs = await withTimeout(
      prisma.blog.findMany({
        where: {
          OR: [{ isPublished: true }, { isPublished: null }],
        },
        select: { slug: true, publishedAt: true },
      }),
      DB_TIMEOUT_MS
    );
    blogEntries = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${encodeURIComponent(blog.slug)}`,
      lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (e) {
    console.warn("Sitemap: could not fetch blogs", e?.message);
  }

  let projectEntries = [];
  try {
    const projects = await withTimeout(
      prisma.project.findMany({
        select: { projectName: true },
      }),
      DB_TIMEOUT_MS
    );
    projectEntries = projects.map((p) => ({
      url: `${baseUrl}/projects/${encodeURIComponent(p.projectName)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (e) {
    console.warn("Sitemap: could not fetch projects", e?.message);
  }

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
