import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return Response.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Forgot password error:", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
