import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { routePermissions } from "./config/routePermissions/routePermissions";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.nextauth.token;
    const userRole = token?.role;

    const allowedRoles = Object.entries(routePermissions).find(([path]) =>
      pathname.startsWith(path)
    )?.[1];

    if (allowedRoles) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
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
  matcher: ["/dashboard/:path*"],
};
