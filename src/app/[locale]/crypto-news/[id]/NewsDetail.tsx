'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import { CryptoNews } from '@/lib/api/crypto';

interface NewsDetailProps {
  news: CryptoNews;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  const { t } = useTranslation();
  const router = useRouter();
  
  // Проверка на наличие данных
  if (!news || Object.keys(news).length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-background-lighter rounded-lg shadow-lg p-6">
          <p className="text-center text-xl text-text-primary">{t('common.not_found')}</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 mx-auto block btn btn-primary"
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }
  
  const {
    TITLE: title,
    IMAGE_URL: imageurl,
    PUBLISHED_ON: published_on,
    BODY: body,
    SOURCE_DATA: source_info,
    URL: url,
    CATEGORY_DATA: tags,
  } = news;
  
  // Convert Unix timestamp to human-readable date
  const publishedDate = new Date(published_on * 1000).toLocaleDateString();
  const publishedTime = new Date(published_on * 1000).toLocaleTimeString();
  
  return (
    <div className="container mx-auto py-8">
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center text-primary hover:text-primary-light"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {t('common.back')}
      </button>
      
      <div className="bg-background-lighter rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 sm:h-80 md:h-96 overflow-hidden relative">
          <img 
            src={imageurl || 'https://via.placeholder.com/1200x600?text=No+Image'} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=No+Image';
            }}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {source_info?.IMAGE_URL && (
                <img 
                  src={source_info.IMAGE_URL} 
                  alt={source_info.NAME || source_info.NAME} 
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="text-primary font-medium">{source_info?.NAME || source_info?.NAME}</span>
            </div>
            <div className="text-text-muted text-sm">
              {publishedDate} {publishedTime}
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">{title}</h1>
          
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-text-secondary">{body}</p>
          </div>
          
          {tags && (
            <div className="mb-6">
              <h3 className="text-text-primary font-semibold mb-2">{t('crypto.tags')}:</h3>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="px-3 py-1 bg-background text-text-secondary text-xs rounded-full border border-gray-800"
                >
                  {tags.map((tag) => tag.NAME).join(', ')}
                </span>
              </div>
            </div>
          )}
          
          {url && (
            <div className="mt-8 pt-4 border-t border-gray-800">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center"
              >
                {t('crypto.read_original')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 