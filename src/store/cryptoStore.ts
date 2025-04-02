import { create } from 'zustand';
import { fetchCryptoNews } from '@/lib/api/crypto';

export const useCryptoStore = create((set, get) => ({
  news: [],
  isLoading: false,
  error: null,
  
  fetchNews: async () => {
    set({ isLoading: true, error: null });
    try {
      const news = await fetchCryptoNews();
      set({ news, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
