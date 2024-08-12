/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design',
    'rc-util',
    'rc-pagination',
    "rc-picker",
    "rc-tree",
    "rc-table",
  ],
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    localeDetection: false,
  },
};

export default nextConfig;