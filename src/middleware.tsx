import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/user")) {
    if (!cookies().has("user")) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (JSON.parse(cookies().get("user")!.value).role !== "USER") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!cookies().has("user")) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (JSON.parse(cookies().get("user")!.value).role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
}
