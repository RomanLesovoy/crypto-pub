'use client';

import { memo } from 'react';

const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <div className="animate-spin w-12 h-12 border-4 border-primary rounded-full border-t-transparent" />
      </div>
    </div>
  );
});

export default LoadingSpinner;
