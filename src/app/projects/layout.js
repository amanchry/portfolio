const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

export const metadata = {
  title: "Projects",
  description:
    "Portfolio of Aman Chaudhary - WebGIS applications, geospatial projects, GIS, remote sensing, and spatial analytics work.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/projects`,
    siteName: "Aman Chaudhary",
    title: "Projects | Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "WebGIS and geospatial projects by Aman Chaudhary - GIS, remote sensing, spatial analytics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "WebGIS and geospatial projects by Aman Chaudhary - GIS, remote sensing, spatial analytics.",
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
