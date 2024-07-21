import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // console.log("nextUrl", nextUrl);
  const isLoggedIn = !!req.auth;
  console.log("req", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isHome = nextUrl.pathname.startsWith("/");

  if (isHome) {
    return NextResponse.next();
  }

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin),
      );
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
      console.log("callbackUrl", callbackUrl);
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    console.log("encodedCallbackUrl", encodedCallbackUrl);

    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    // "/",
    // "/api/auth/session",
    "/(api|trpc)(.*)",
    // "/((?!api/socket).*)",
  ],
};
