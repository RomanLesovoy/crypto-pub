'use client';

const useNewsPageHistory = () => {
  const getHistory = () => {
    if (typeof window === 'undefined') {
      return [];
    }

    const history = window.localStorage.getItem('pageHistory') || [];
    try {
      return typeof history === 'string' ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error parsing page history:', error);
      return [];
    }
  };

  const setHistory = (history: string[]) => {
    localStorage.setItem('pageHistory', JSON.stringify(history));
  };

  return { getHistory, setHistory };
};

export default useNewsPageHistory;
