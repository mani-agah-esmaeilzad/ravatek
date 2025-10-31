'use client';

import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { useTranslations } from 'next-intl';

const baseConfig = {
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ravatek.example.com',
    siteName: 'Ravatek'
  },
  twitter: {
    handle: '@ravatek_ai',
    site: '@ravatek_ai',
    cardType: 'summary_large_image'
  }
};

export function DefaultSeo({ locale }: { locale: string }) {
  const t = useTranslations('seo');

  return (
    <NextDefaultSeo
      {...baseConfig}
      titleTemplate="%s | Ravatek"
      defaultTitle={t('title')}
      description={t('description')}
      openGraph={{
        ...baseConfig.openGraph,
        locale: locale === 'fa' ? 'fa_IR' : 'en_US',
        title: t('title'),
        description: t('description'),
        images: [
          {
            url: 'https://ravatek.example.com/og.jpg',
            width: 1200,
            height: 630,
            alt: t('title')
          }
        ]
      }}
    />
  );
}
