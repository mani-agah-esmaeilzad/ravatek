import { slugify as transliterate } from 'transliteration';

export function slugify(title: string, locale: string) {
  const base = transliterate(title, { lowercase: true, separator: '-' });
  return `${locale}-${base.replace(/[^a-z0-9\-]+/g, '-')}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
}
