export function formatDate(date: string | Date, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return formatter.format(new Date(date));
}
