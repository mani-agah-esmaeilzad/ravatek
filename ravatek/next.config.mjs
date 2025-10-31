import { withNextIntl } from 'next-intl/plugin';

const withIntl = withNextIntl('./src/i18n/request.ts');

const config = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default withIntl(config);
