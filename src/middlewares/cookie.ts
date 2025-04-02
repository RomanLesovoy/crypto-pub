import { NextResponse, NextRequest } from "next/server";

export async function middlewareCookie(request: NextRequest, next: NextResponse) {
  const { pathname } = request.nextUrl;
  next.cookies.set('APP_CURRENT_PATH', pathname);
}

