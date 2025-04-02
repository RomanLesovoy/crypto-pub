'use client';

import Link from 'next/link';
import { supportedLngs } from '@/lib/i18n/settings';
import { usePathname } from 'next/navigation';

interface LanguageLinksProps {
  locale: string;
}

export default function LanguageLinks({ locale }: LanguageLinksProps) {
  const pathname = usePathname();

  const getPathWithLocale = (lng: string) => {
    return pathname.replace(`/${locale}`, `/${lng}`);
  };
  
  return (
    <div className="flex items-center space-x-4">
      {supportedLngs.map((lng) => (
        <Link
          key={lng}
          className={`hover:text-primary transition-colors ${locale === lng ? 'text-primary' : 'text-text-muted'}`}
          href={getPathWithLocale(lng)}
          locale={lng}
        >
          {lng}
        </Link>
      ))}
    </div>
  );
}
