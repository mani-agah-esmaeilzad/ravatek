'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next-intl/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations('language');
  const [hash, setHash] = useState('');

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const locale = (params?.locale as string) || 'en';
  const targetLocale = locale === 'fa' ? 'en' : 'fa';

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    segments[0] = targetLocale;
  }
  const hrefBase = `/${segments.join('/') || targetLocale}`;
  const href = `${hrefBase}${hash}`;

  return (
    <Button variant="ghost" className="font-medium" asChild>
      <Link href={href} locale={targetLocale} prefetch>
        {targetLocale === 'fa' ? t('fa') : t('en')}
      </Link>
    </Button>
  );
}
