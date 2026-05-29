export type Locale = 'en' | 'pl';

export const LOCALES: Locale[] = ['en', 'pl'];
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as string[]).includes(value);
