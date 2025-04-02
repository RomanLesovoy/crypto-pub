'use server'

import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/lib/i18n';
import { Providers } from '@/components/providers';
import '../globals.css';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

interface Params {
  locale: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const { t } = await useTranslation(locale);
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function RootLayout({ 
  children, 
  params,
}: {
  children: React.ReactNode, 
  params: Promise<Params>,
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-background flex flex-col h-screen max-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow flex flex-col flex-1 overflow-y-auto">
            <div className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
