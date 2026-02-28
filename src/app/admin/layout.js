import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import AdminThemeWrapper from "@/components/AdminThemeWrapper";




export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  if (!session.user?.admin) {
    redirect("/");
  }

  return <AdminThemeWrapper>{children}</AdminThemeWrapper>;
}
