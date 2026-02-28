import { prisma } from "@/lib/prisma";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.amanchaudhary.com";

function toPlainText(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
}

export async function generateMetadata({ params }) {
  const { blogDetails: raw } = await params;
  const slug = raw ? decodeURIComponent(raw).toLowerCase().trim() : "";
  if (!slug) return { title: "Blog | Aman Chaudhary" };

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: { title: true, shortDescription: true, isPublished: true },
    });
    if (!blog || blog.isPublished === false) return { title: "Blog | Aman Chaudhary" };

    const title = `${blog.title} | Aman Chaudhary`;
    const description =
      toPlainText(blog.shortDescription) || `Article by Aman Chaudhary - ${blog.title}`;

    return {
      title,
      description,
      openGraph: {
        type: "article",
        locale: "en_US",
        url: `${baseUrl}/blogs/${encodeURIComponent(slug)}`,
        siteName: "Aman Chaudhary",
        title,
        description,
      },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return { title: "Blog | Aman Chaudhary" };
  }
}

export default function BlogDetailsLayout({ children }) {
  return children;
}
