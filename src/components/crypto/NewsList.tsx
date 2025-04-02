'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import NewsCard from '@/components/crypto/NewsCard';
import { CryptoNews } from '@/lib/api/crypto';
import useNewsPageHistory from '@/hooks/useNewsPageHistory';

export default function NewsList({ newsPromise }: { newsPromise: Promise<CryptoNews[]> }) {
  const { t } = useTranslation();
  const router = useRouter();
  const news = use(newsPromise);
  const [hasPrevious, setHasPrevious] = useState(false);
  const newestPublishedOn = news[0].PUBLISHED_ON;
  const oldestPublishedOn = news[news.length - 1].PUBLISHED_ON;
  const { getHistory, setHistory } = useNewsPageHistory();

  useEffect(() => {
    setHasPrevious(getHistory().length > 0);
  }, [getHistory()]);

  const handleRefresh = async () => {
    router.refresh();
  };

  const onNext = () => {
    setHistory([...getHistory(), newestPublishedOn]);
    setTimeout(() => {
      router.push(`/crypto-news?to_ts=${oldestPublishedOn}`);
    }, 0);
  };

  const onPrev = () => {
    const newHistory = getHistory();
    setHistory(newHistory.slice(0, -1));
    setTimeout(() => {
      if (newHistory.length > 1) {
        router.push(`/crypto-news?to_ts=${newHistory[newHistory.length - 1]}`);
      } else {
        router.push(`/crypto-news`);
      }
    }, 0);
  };

  useEffect(() => {
    return () => {
      setHistory([]);
    };
  }, []);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-primary">{t('crypto.latest_news')}</h2>
        <button 
          onClick={handleRefresh}
          className="btn btn-primary flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{t('crypto.refresh')}</span>
        </button>
      </div>
      
      {news.length === 0 ? (
        <div className="bg-background-lighter p-8 rounded-lg text-center">
          <p className="text-text-secondary">{t('crypto.no_news')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard 
              key={item.ID} 
              newsItem={item} 
              onClick={() => {
                router.push(`/crypto-news/${item.ID}?guid=${item.GUID}&source_key=${item.SOURCE_DATA.SOURCE_KEY}`)
              }}
            />
          ))}
        </div>
      )}

      {news.length > 0 && (
        <div className="flex justify-between mt-8">
          <button
            disabled={!hasPrevious}
            onClick={onPrev}
            className={`btn btn-primary ${!hasPrevious ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
          >
            {t('common.prev')}
          </button>
          <button 
            onClick={onNext}
            className="btn btn-primary"
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  );
}
