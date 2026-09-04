import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const isProfileCompleted = (session.user as any)?.profileCompleted;
  if (isProfileCompleted) {
    redirect("/dashboard");
  } else {
    redirect("/onboarding/profile");
  }
}
