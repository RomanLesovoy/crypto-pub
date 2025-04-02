'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type LoadingContextType = {
  showLoading: (shouldShow: boolean) => void;
  hideLoading: () => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
  shouldShowLoadingOnRouteChange: (route: string) => boolean;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отслеживаем изменения маршрута
  useEffect(() => {
    setTimeout(() => {
      hideLoading();
    }, 200);
  }, [pathname, searchParams]);

  // Показать лоадер
  function showLoading(shouldShow: boolean = true) {
    setIsLoading(shouldShow);
  }

  function shouldShowLoadingOnRouteChange(route: string) {
    return route !== pathname;
  }

  // Скрыть лоадер
  function hideLoading() {
    setIsLoading(false);
  }

  // Обертка для асинхронных функций
  async function withLoading<T>(promise: Promise<T>): Promise<T> {
    showLoading();
    try {
      return await promise;
    } finally {
      hideLoading();
    }
  }

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, withLoading, shouldShowLoadingOnRouteChange }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
}
