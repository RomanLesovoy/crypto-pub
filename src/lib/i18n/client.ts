'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, supportedLngs, defaultNS } from './settings';
import { useParams } from 'next/navigation';

// Client-side i18next initialization
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, ns: string) => 
      import(`./locales/${language}/${ns}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // Let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    }
  });

export function useTranslation(namespace = defaultNS) {
  const locale = useLanguage();
  
  if (i18next.resolvedLanguage !== locale) {
    i18next.changeLanguage(locale as string);
  }
  
  return useTranslationOrg(namespace);
}

export function useLanguage() {
  const params = useParams();
  const locale = params?.locale || supportedLngs[0];
  return locale;
}
