import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const src = (p) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': src(''),
        '@components': src('components'),
        '@layouts': src('layouts'),
        '@lib': src('lib'),
        '@styles': src('styles'),
        '@types': src('types'),
        '@i18n': src('i18n/index.ts'),
      },
    },
  },
  site: 'https://example.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl', 'de'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  redirects: {
    '/': '/en',
  },
});
