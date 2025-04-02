'use server';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { getHeaders } from '@/lib/utils/headers';

export default async function Footer() {
  const { locale } = await getHeaders();
  const { t } = await useTranslation(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-text-secondary p-4 border-t border-gray-600">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('footer.about')}
            </h3>
            <p className="text-text-muted">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/faq`} className="text-text-muted hover:text-primary">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-text-muted hover:text-primary">
                  {t('footer.blog')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/terms`} className="text-text-muted hover:text-primary">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-text-muted hover:text-primary">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2">
              <li className="text-text-muted">
                <span className="block">Email:</span>
                <a href="mailto:info@cryptopub.com" className="hover:text-primary">
                  info@cryptopub.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-text-muted">
          <p>© {currentYear} CryptoPub. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
