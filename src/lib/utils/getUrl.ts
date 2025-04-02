import { NextRequest } from "next/server";
import dotenv from 'dotenv';
dotenv.config();

export function getUrl(request: NextRequest) {
  const url = request.nextUrl.clone();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || 'localhost:3000';
  return new URL(url, basePath);
}
