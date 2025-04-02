'use server';

export interface CryptoNews {
  TYPE: string;
  ID: number;
  GUID: string;
  PUBLISHED_ON: number;
  IMAGE_URL: string;
  TITLE: string;
  URL: string;
  BODY: string;
  KEYWORDS: string;
  LANG: string;
  UPVOTES: number;
  DOWNVOTES: number;
  SCORE: number;
  SENTIMENT: string;
  STATUS: string;
  CREATED_ON: number;
  UPDATED_ON: number;
  SOURCE_DATA: {
    TYPE: string;
    ID: number; 
    SOURCE_KEY: string;
    NAME: string;
    IMAGE_URL: string;
    URL: string;
    LANG: string;
    SOURCE_TYPE: string;
    LAUNCH_DATE: number | null;
    SORT_ORDER: number;
    BENCHMARK_SCORE: number;
    STATUS: string;
    LAST_UPDATED_TS: number;
    CREATED_ON: number;
    UPDATED_ON: number;
  };
  CATEGORY_DATA: {
    TYPE: string;
    ID: number;
    NAME: string;
    CATEGORY: string;
  }[];
}

// TODO paginatin
export async function fetchCryptoNews({ limit = 9, to_ts = Math.ceil(Date.now() / 1000) }: { limit?: number, to_ts?: number }) {
  try {
    const response = await fetch(`https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=${limit}&to_ts=${to_ts}`, { next: { revalidate: 300 } }); // 5 min cache
    const data = (await response.json()).Data as CryptoNews[];
    return data;
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    return [];
  }
}

export async function fetchCryptoNewsByGuid(guid: string, source_key: string): Promise<CryptoNews> {
  try {
    // Если используете внешний API
    const response = await fetch(`https://data-api.coindesk.com/news/v1/article/get?source_key=${source_key}&guid=${guid}`);

    const data = (await response.json()).Data as CryptoNews;
    return data;
  } catch (error) {
    console.error('Error fetching crypto news by ID:', error);
    // Возвращаем пустой объект или можно выбросить ошибку
    return {} as CryptoNews;
  }
}
