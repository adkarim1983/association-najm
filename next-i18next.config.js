module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr', 'ar'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
