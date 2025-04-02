'use server';

import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import config from '@/../next.config';

export async function middlewareRedirectToCryptoNews(request: NextRequest) {
  const { isAuth, isAuthPage } = await getAuthDataFromRequest(request);

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/crypto-news', request.url));
    }
    return null;
  }
}

export async function middlewareRedirectToLogin(request: NextRequest) {
  const { isAuth, isApiAuthRoute, isPageRequiresAuth } = await getAuthDataFromRequest(request);

  if (!isAuth && !isApiAuthRoute && isPageRequiresAuth) {
    const url = new URL(`/auth/login`, request.url);
    return NextResponse.redirect(url);
  }
  return null;
}

async function getAuthDataFromRequest(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuth = !!token;

  const isAuthPage = request.nextUrl.pathname.includes('/auth');
  const isApiAuthRoute = request.nextUrl.pathname.includes('/api/auth');
  const pagesRequiresAuth: string[] = config.pagesRequiresAuth;
  const isPageRequiresAuth = pagesRequiresAuth.some(page => request.nextUrl.pathname.includes(page));

  return { isAuth, token, isAuthPage, isApiAuthRoute, isPageRequiresAuth };
}
