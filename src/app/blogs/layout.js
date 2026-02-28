const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

export const metadata = {
  title: "Blogs",
  description:
    "Blogs and Articles by Aman Chaudhary on WebGIS, geospatial technologies, GIS, GeoAI, remote sensing, and open-source spatial infrastructure.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/blogs`,
    siteName: "Aman Chaudhary",
    title: "Blogs | Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "Articles by Aman Chaudhary on WebGIS, geospatial technologies, GIS, GeoAI, and remote sensing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "Articles by Aman Chaudhary on WebGIS, geospatial technologies, GIS, GeoAI, and remote sensing.",
  },
};

export default function BlogsLayout({ children }) {
  return children;
}
