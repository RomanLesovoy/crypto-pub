export const defaultNS = 'common';
export const fallbackLng = 'en';
export const supportedLngs = ['en', 'ru'];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
