const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

const staticRoutes = [
  { url: "", changefreq: "monthly", priority: 1 },
  { url: "/about", changefreq: "monthly", priority: 0.9 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/blogs", changefreq: "monthly", priority: 0.9 },
  { url: "/projects", changefreq: "monthly", priority: 0.8 },
];

export default function sitemap() {
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}
