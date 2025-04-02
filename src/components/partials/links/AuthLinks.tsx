'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import { signOut, useSession } from 'next-auth/react';

interface AuthLinksProps {
  locale: string;
}

export default function AuthLinks({ locale }: AuthLinksProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;
  
  if (session) {
    return (
      <div className="flex space-x-3">
        <span className="text-sm font-medium text-text-primary">
          {session.user?.name}
        </span>
        <form action={() => signOut()}>
          <button 
            type="submit" 
            className="btn btn-sm btn-outline text-text-muted border-danger hover:border-danger hover:text-danger"
          >
            {t('auth.logout')}
          </button>
        </form>
      </div>
    );
  }
  
  return (
    <nav className="flex space-x-3">
      <Link 
        href={`/${locale}/auth/login`} 
        className={`btn btn-sm text-text-muted ${isActive(`/${locale}/auth/login`) ? 'btn-primary text-text-primary' : 'outline btn-secondary'}`}
      >
        {t('auth.login')}
      </Link>
      <Link 
        href={`/${locale}/auth/signup`} 
        className={`btn btn-sm text-text-muted ${isActive(`/${locale}/auth/signup`) ? 'btn-primary text-text-primary' : 'outline btn-secondary'}`}
      >
        {t('auth.signup')}
      </Link>
    </nav>
  );
}
