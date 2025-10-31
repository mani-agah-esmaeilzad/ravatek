import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!['en', 'fa'].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
