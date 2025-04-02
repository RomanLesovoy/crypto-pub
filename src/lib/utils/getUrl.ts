
import { NextRequest } from "next/server";
import { env } from '@/../next.config';

export function getUrl(request: NextRequest) {
  const url = request.nextUrl.clone();
  const basePath = env!.NEXT_PUBLIC_BASE_PATH || 'localhost:3000';
  return new URL(url.pathname, basePath);
}
