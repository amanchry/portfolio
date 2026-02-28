const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

export const metadata = {
  title: "About",
  description:
    "Aman Chaudhary - Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, and remote sensing, building scalable open-source spatial systems.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/about`,
    siteName: "Aman Chaudhary",
    title: "About Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "know about Aman Chaudhary - Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, and remote sensing, building scalable open-source spatial systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "know about Aman Chaudhary - Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, and remote sensing, building scalable open-source spatial systems.",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
