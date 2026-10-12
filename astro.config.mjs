// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://leonardomonteiroo.github.io',
  base: '/personal-portfolio',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', pt: 'pt-BR' },
      },
    }),
  ],
});
