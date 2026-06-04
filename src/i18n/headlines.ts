import type { Locale } from '@/types';
import type { HeadlineVariant } from '@/types/tweaks';

export type HeadlineCopy = readonly [string, string];

export const HEADLINES: Record<HeadlineVariant, Record<Locale, HeadlineCopy>> = {
  default: {
    en: ['Architecture', 'with purpose.'],
    pl: ['Architektura', 'z sensem.'],
    de: ['Architektur', 'mit Sinn.'],
  },
  spaces: {
    en: ['Spaces', 'that work.'],
    pl: ['Przestrzenie,', 'które działają.'],
    de: ['Räume,', 'die funktionieren.'],
  },
  briefs: {
    en: ['Buildings, briefs,', 'beauty.'],
    pl: ['Budynki, briefy,', 'piękno.'],
    de: ['Gebäude, Briefings,', 'Schönheit.'],
  },
} as const;

export const BADGE_PHRASES: Record<Locale, readonly string[]> = {
  en: ['Available for hire', 'Open to senior roles', 'Booking 2026', 'Remote OK'],
  pl: ['Dostępna do współpracy', 'Otwarta na stanowiska senior', 'Rezerwacje 2026', 'Remote OK'],
  de: ['Verfügbar für Aufträge', 'Offen für Senior-Stellen', 'Buchungen 2026', 'Remote OK'],
} as const;
