import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // If user is accessing /dashboard but profile is not completed, redirect to /onboarding/profile
    if (isAuth && pathname.startsWith("/dashboard")) {
      const isProfileCompleted = token.profileCompleted;
      if (isProfileCompleted === false) {
        return NextResponse.redirect(new URL("/onboarding/profile", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/resume/:path*",
    "/interview/:path*",
    "/assessment/:path*",
    "/reports/:path*",
  ],
};
