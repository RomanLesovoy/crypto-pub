'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';

interface NavLinksProps {
  locale: string;
}

export default function NavLinks({ locale }: NavLinksProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const getClassName = (path: string) => {
    const isActive = pathname === path;
    return `hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`;
  };
  
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <li>
          <Link
            href={`/${locale}`}
            className={getClassName(`/${locale}`)}
          >
            {t('nav.home')}
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/crypto-news`}
            className={getClassName(`/${locale}/crypto-news`)}
          >
            {t('nav.crypto')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
