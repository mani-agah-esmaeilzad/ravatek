const PERSIAN_CHAR_CLASS = '\\u0600-\\u06FF';

export function slugify(title: string, locale: string) {
  const normalized = title
    .normalize('NFKD')
    .replace(/[`'".,!?()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const base = normalized
    .toLowerCase()
    .replace(new RegExp(`[^a-z0-9${PERSIAN_CHAR_CLASS}\s-]`, 'g'), '')
    .replace(/\s+/g, '-');

  return `${locale}-${base}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
}
