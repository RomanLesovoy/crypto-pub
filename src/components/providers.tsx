'use client';

import { SessionProvider } from 'next-auth/react';
import { LoadingProvider } from '@/contexts/LoadingContext';
import NavigationInterceptor from './NavigationInterceptor';

export function Providers({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LoadingProvider>
        <NavigationInterceptor />
        {children}
      </LoadingProvider>
    </SessionProvider>
  );
}
