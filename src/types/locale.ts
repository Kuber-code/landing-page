export type Locale = 'en' | 'pl' | 'de';

export const LOCALES: Locale[] = ['en', 'pl', 'de'];
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as string[]).includes(value);
