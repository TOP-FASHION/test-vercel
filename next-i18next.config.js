const path = require('path')

/** @type {import('next-i18next').UserConfig} */
const nextI18nextConfig = {
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
  },
  defaultNS: 'common.generated',
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.BUILD_ENV === 'development',
}

module.exports = nextI18nextConfig
