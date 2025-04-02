import { NextResponse, NextRequest } from 'next/server';
import { middlewareRedirectToCryptoNews, middlewareRedirectToLogin } from './middlewares/auth';
import { middleware as middlewareLocale } from './middlewares/locale';
import { middlewareCookie } from './middlewares/cookie';
import { middlewareLoader } from './middlewares/html-loader';
import { supportedLngs } from './lib/i18n/settings';

export async function middleware(request: NextRequest) {
  // skip middleware for static files, api and other resources
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.'))
  {
    return NextResponse.next();
  }

  logRequest(request); // log before locale redirect (requests can be duplicated)

  if (request.nextUrl.pathname === '/'
    || supportedLngs.some(locale => request.nextUrl.pathname === `/${locale}`)
    || request.nextUrl.pathname === ''
  ) {
    return NextResponse.redirect(new URL('/crypto-news', request.url));
  }

  // locale is missing in url, redirect to the correct locale
  const pageRedirectWithLocale = await middlewareLocale(request);
  if (pageRedirectWithLocale && pageRedirectWithLocale instanceof NextResponse) {
    return pageRedirectWithLocale;
  }

  // page requires auth, redirect to the login page
  const pageRequiresAuth = await middlewareRedirectToLogin(request);
  if (pageRequiresAuth && pageRequiresAuth instanceof NextResponse) {
    return pageRequiresAuth;
  }

  // page not requires auth, redirect to the authenticated page
  const pageNotRequiresAuth = await middlewareRedirectToCryptoNews(request);
  if (pageNotRequiresAuth && pageNotRequiresAuth instanceof NextResponse) {
    return pageNotRequiresAuth;
  }

  const next = middlewareLoader(request);
  await middlewareCookie(request, next);

  return next;
}

export const config = {
  matcher: [
    // Исключаем статические файлы, API и служебные пути
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|.*\\..*|$).*)',
    // '/', // can be used to redirect to the root page instead of next.config.js
  ],
};

function logRequest(request: NextRequest) {
  console.info(`Request: ${request.method} ${request.url}`);
}
