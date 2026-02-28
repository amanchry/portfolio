const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/", "/api", "/auth"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/admin", "/admin/", "/api", "/auth"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
