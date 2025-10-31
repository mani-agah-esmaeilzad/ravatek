'use client';

import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '', label: t('home') },
    { href: '#products', label: t('products') },
    { href: '#solutions', label: t('solutions') },
    { href: '/blog', label: t('blog') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') }
  ];

  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] || 'en';

  const buildHref = (path: string) => {
    if (!path) return `/${locale}`;
    if (path.startsWith('#')) return `/${locale}${path}`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition backdrop-blur ${isScrolled ? 'bg-background/80 shadow-sm' : 'bg-transparent'}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-tight" prefetch>
          Ravatek
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href || link.label} href={buildHref(link.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button className="hidden md:inline-flex" size="sm">
            {t('requestDemo')}
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
