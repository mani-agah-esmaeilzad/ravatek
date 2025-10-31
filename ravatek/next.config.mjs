import createNextIntlPlugin from 'next-intl/plugin';

const withIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default withIntl(config);
