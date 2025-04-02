'use client';

import { CryptoNews } from '@/lib/api/crypto';

interface NewsCardProps {
  newsItem: CryptoNews;
  onClick: () => void;
}

export default function NewsCard({ newsItem, onClick }: NewsCardProps) {
  const {
    TITLE: title,
    IMAGE_URL: imageurl,
    PUBLISHED_ON: published_on,
    BODY: body,
    SOURCE_DATA: source_info,
  } = newsItem;
  
  // Convert Unix timestamp to human-readable date
  const publishedDate = new Date(published_on * 1000).toLocaleDateString();
  
  // Cut the body to 100 characters
  const shortBody = body.length > 100 ? `${body.substring(0, 100)}...` : body;
  
  return (
    <div 
      className="bg-background-lighter rounded-lg shadow hover:shadow-md transition-shadow duration-300 
                overflow-hidden flex flex-col h-full cursor-pointer transform hover:scale-[1.02] 
                transition-transform border border-gray-800"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageurl || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">{title}</h3>
        <p className="text-text-secondary mb-4 flex-grow text-sm line-clamp-3">{shortBody}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800">
          <span className="text-text-muted text-xs">{publishedDate}</span>
          <div className="flex items-center space-x-2">
            {source_info?.IMAGE_URL && (
              <img 
                src={source_info.IMAGE_URL} 
                alt={source_info.NAME || source_info.NAME} 
                className="w-4 h-4 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <span className="text-xs text-primary">{source_info?.NAME || source_info?.NAME}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
