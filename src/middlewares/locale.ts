import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { supportedLngs, fallbackLng } from '@/lib/i18n/settings';
import Negotiator from 'negotiator';

// Получение предпочтительной локали пользователя из заголовков
function getLocale(request: NextRequest): string {
  // Создаем заголовки для Negotiator
  const headers = {
    'accept-language': request.headers.get('accept-language') || fallbackLng
  };
  
  const languages = new Negotiator({ headers }).languages();
  
  return matchLocale(languages, supportedLngs, fallbackLng);
}

// Проверка, содержит ли URL уже локаль
function hasLocale(pathname: string): boolean {
  return supportedLngs.some((locale: string) => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  // Если URL уже содержит локаль, пропускаем
  if (hasLocale(pathname)) {
    return null;
  }
  
  // Получаем предпочтительную локаль
  const locale = getLocale(request);
  
  // Создаем новый URL с локалью
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  // Сохраняем все параметры запроса
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  // Перенаправляем на новый URL с локалью
  return NextResponse.redirect(url, { headers: requestHeaders });
}
