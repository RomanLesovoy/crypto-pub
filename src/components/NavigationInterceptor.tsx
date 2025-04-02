'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

// Патчит навигационные методы Next.js
export default function NavigationInterceptor() {
  const { showLoading, shouldShowLoadingOnRouteChange } = useLoading();
  const router = useRouter();

  useEffect(() => {
    if (!router || typeof window === 'undefined') return;

    // Сохраняем оригинальные методы
    const originalPush = router.push;
    const originalReplace = router.replace;
    
    // Переопределяем методы навигации
    (router as any).push = function patchedPush(...args: any[]) {
      showLoading(shouldShowLoadingOnRouteChange(args[0]));
      return originalPush.apply(this, args as any);
    };
    
    (router as any).replace = function patchedReplace(...args: any[]) {
      showLoading(shouldShowLoadingOnRouteChange(args[0]));
      return originalReplace.apply(this, args as any);
    };

    return () => {
      // Восстанавливаем оригинальные методы при размонтировании
      (router as any).push = originalPush;
      (router as any).replace = originalReplace;
    };
  }, [router, showLoading]);

  return null;
}
