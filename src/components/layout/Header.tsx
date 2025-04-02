'use server';

import Link from 'next/link';
import { getHeaders } from '@/lib/utils/headers';
import LanguageLinks from '@/components/partials/links/LanguageLinks';
import AuthLinks from '@/components/partials/links/AuthLinks';
import NavLinks from '@/components/partials/links/NavLinks';

export default async function Header() {
  const { locale } = await getHeaders();

  return (
    <header className="bg-background-lighter shadow border-b border-gray-600">
      <section className="container flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary">
            CryptoPub
          </Link>
        </div>

        <NavLinks locale={locale} />

        <div className="flex items-center space-x-4">
          <AuthLinks locale={locale} />
          <LanguageLinks locale={locale} />
        </div>

      </section>
    </header>
  );
}
