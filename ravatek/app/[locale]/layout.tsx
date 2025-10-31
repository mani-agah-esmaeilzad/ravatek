import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { DefaultSeo } from '@/components/seo/default-seo';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fa' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const locale = params.locale;
  setRequestLocale(locale);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <DefaultSeo locale={locale} />
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
