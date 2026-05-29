import type { TweakState } from '@/types/tweaks';

export const STORAGE_KEY = 'aga.tweaks.v1';

export const DEFAULT_TWEAKS: TweakState = {
  theme: 'stone',
  accent: 'sand',
  hfont: 'cormorant',
  bfont: 'dm',
  hero: 'split',
  grid: 'masonry',
  density: 'medium',
  images: 'placeholder',
  headline: 'default',
  headlineSize: 100,
  dark: false,
  eyebrow: true,
  reveal: true,
  lang: 'en',
};
