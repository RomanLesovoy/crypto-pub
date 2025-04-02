import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions, defaultNS } from './settings';

// Server-side translation function
export async function useTranslation(locale: string, namespace = defaultNS) {
  const i18nextInstance = createInstance();
  
  await i18nextInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, ns: string) => 
        import(`./locales/${language}/${ns}.json`)
      )
    )
    .init(getOptions(locale, namespace));
    
  return {
    t: i18nextInstance.getFixedT(locale, namespace),
    i18n: i18nextInstance
  };
}
