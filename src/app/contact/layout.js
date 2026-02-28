const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Aman Chaudhary - Geospatial and WebGIS developer. Send a message for collaborations, consulting, or inquiries.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/contact`,
    siteName: "Aman Chaudhary",
    title: "Contact Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "Get in touch with Aman Chaudhary for geospatial, WebGIS, GeoAI, and remote sensing inquiries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "Get in touch with Aman Chaudhary for geospatial, WebGIS, GeoAI, and remote sensing inquiries.",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
