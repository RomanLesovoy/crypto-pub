'use server';

import { fetchCryptoNewsByGuid } from '@/lib/api/crypto';
import NewsDetail from './NewsDetail';

// Этот компонент работает на сервере и может загружать данные
export default async function CryptoNewsDetailPage({ 
  searchParams
}: { 
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { source_key, guid } = await searchParams;
  // Загружаем данные новости по ID
  const newsData = await fetchCryptoNewsByGuid(guid as string, source_key as string);
  
  // Передаем полученные данные в клиентский компонент
  return <NewsDetail news={newsData} />;
}
