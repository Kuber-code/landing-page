import type { TweakState } from '@/types/tweaks';

export const STORAGE_KEY = 'aga.tweaks.v2';

export const DEFAULT_TWEAKS: TweakState = {
  theme: 'stone',
  accent: 'sand',
  hfont: 'fraunces',
  bfont: 'dm',
  hero: 'split',
  grid: 'cols2',
  density: 'loose',
  images: 'placeholder',
  headline: 'briefs',
  headlineSize: 100,
  dark: false,
  eyebrow: true,
  reveal: true,
  lang: 'en',
};
