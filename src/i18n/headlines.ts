import type { Locale } from '@/types';
import type { HeadlineVariant } from '@/types/tweaks';

export type HeadlineCopy = readonly [string, string];

export const HEADLINES: Record<HeadlineVariant, Record<Locale, HeadlineCopy>> = {
  default: {
    en: ['Architecture', 'with purpose.'],
    pl: ['Architektura', 'z sensem.'],
  },
  spaces: {
    en: ['Spaces', 'that work.'],
    pl: ['Przestrzenie,', 'które działają.'],
  },
  briefs: {
    en: ['Buildings, briefs,', 'beauty.'],
    pl: ['Budynki, briefy,', 'piękno.'],
  },
} as const;

export const BADGE_PHRASES: Record<Locale, readonly string[]> = {
  en: ['Available for hire', 'Open to senior roles', 'Booking Q2 2025', 'Warsaw · Remote OK'],
  pl: ['Dostępna do współpracy', 'Otwarta na stanowiska senior', 'Rezerwacje Q2 2025', 'Warszawa · Remote OK'],
} as const;
