import type { Metadata } from 'next';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import '@/lib/cron';
import { Inter, Vazirmatn } from 'next/font/google';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const vazir = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazirmatn' });

export const metadata: Metadata = {
  title: 'Ravatek',
  description: 'Intelligent systems for business growth'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get('x-next-intl-locale') ?? 'en';
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${inter.variable} ${vazir.variable} font-sans`}>{children}</body>
    </html>
  );
}
