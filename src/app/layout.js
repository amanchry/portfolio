import "@fontsource-variable/raleway";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/global.css";
import "@/styles/style.css";
import "@/styles/templete.css";
import "@/styles/skin.css";
import "@/styles/navbar.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aman Chaudhary | Geospatial Solutions Developer",
    template: "%s | Aman Chaudhary",
  },
  description:
    "Aman Chaudhary is a Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, remote sensing, and scalable open-source spatial infrastructure.",
  keywords: [
    "Aman Chaudhary",
    "Aman Chaudhary GIS",
    "Aman Chaudhary University of Twente",
    "Aman Chaudhary IIT Gandhinagar",
    "Aman Chaudhary WebGIS",
    "WebGIS developer",
    "Geospatial developer",
  ],
  authors: [{ name: "Aman Chaudhary", url: siteUrl }],
  creator: "Aman Chaudhary",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Aman Chaudhary",
    title: "Aman Chaudhary | Geospatial Solutions Developer",
    description:
      "Aman Chaudhary is a Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, remote sensing, and scalable open-source spatial infrastructure.",
    images: [{ url: "/images/aman1.jpg", width: 500, height: 600, alt: "Aman Chaudhary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Chaudhary | Geospatial Solutions Developer",
    description: "Aman Chaudhary is a Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, remote sensing, and scalable open-source spatial infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: { google: "MZTK0uf2XlaN0lQNV9tIfP56jnhWKCVj332CE7yK0PM" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aman Chaudhary",
  url: siteUrl,
  image: `${siteUrl}/images/aman1.jpg`,
  jobTitle: "Geospatial Solutions Developer",
  worksFor: {
    "@type": "Organization",
    name: "World Bank Group",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Twente", url: "https://www.utwente.nl" },
    { "@type": "CollegeOrUniversity", name: "IIT Gandhinagar", url: "https://iitgn.ac.in" },
  ],
  knowsAbout: ["WebGIS", "GeoAI",  "Open Source Geospatial Tools","Remote Sensing",  "Spatial Analytics"],
  description:
    "Aman Chaudhary is a Geospatial Software Developer specializing in GIS, WebGIS, GeoAI, remote sensing, and scalable open-source spatial infrastructure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
