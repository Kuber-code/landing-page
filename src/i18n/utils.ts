import type { Locale } from '@/types';
import { DEFAULT_LOCALE, isLocale } from '@/types';

/** Build a locale-prefixed path: localized('en', '/work') → '/en/work' */
export const localized = (locale: Locale, path: string): string => {
  const cleaned = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleaned === '/' ? '' : cleaned}`;
};

/** Extract locale from an Astro page param or URL. Falls back to default. */
export const localeFromParam = (value: string | undefined): Locale =>
  value && isLocale(value) ? value : DEFAULT_LOCALE;

/** Swap locale in a URL pathname for the language toggle. */
export const swapLocale = (pathname: string, next: Locale): string => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  parts[0] = next;
  return `/${parts.join('/')}`;
};
