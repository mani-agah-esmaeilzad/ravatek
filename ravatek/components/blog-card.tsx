'use client';

import Link from 'next-intl/link';
import { formatDate } from '@/lib/format-date';
import { useTranslations } from 'next-intl';

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    createdAt: string | Date;
  };
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const t = useTranslations('blog');
  const href = `/${locale}/blog/${post.slug}`;

  return (
    <article className="group rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t('publishedOn')}</span>
        <span>{formatDate(post.createdAt, locale)}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{post.summary}</p>
      <Link href={href} className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
        {t('readMore')} →
      </Link>
    </article>
  );
}
