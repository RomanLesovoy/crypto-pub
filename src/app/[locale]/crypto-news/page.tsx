'use server';

import { Suspense } from 'react';
import NewsList from '@/components/crypto/NewsList';
import { useTranslation } from '@/lib/i18n';
import { fetchCryptoNews } from '@/lib/api/crypto';

export default async function CryptoNewsPage(
  { params, searchParams }: {
    params: Promise<{ locale: string }>,
    searchParams: Promise<{ [key: string]: string }>
  }) {
  const locale = (await params).locale; // params automatically passed when there is [locale] path
  const { t } = await useTranslation(locale);
  const news = fetchCryptoNews({ to_ts: Number((await searchParams).to_ts) || undefined });
  
  return (
    <div className="crypto-news-container">
      <h1 className="text-3xl font-bold text-text-primary">{t('crypto.news_title')}</h1>
      <p className="text-text-secondary">{t('crypto.news_description')}</p>
      
      <Suspense fallback={<div className="loading">{t('common.loading')}...</div>}>
        <NewsList newsPromise={news} />
      </Suspense>
    </div>
  );
}
