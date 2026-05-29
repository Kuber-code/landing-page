import type { Locale } from './locale';

export type ThemeKey = 'stone' | 'cool' | 'cream' | 'sage';
export type AccentKey = 'sand' | 'terracotta' | 'sage' | 'navy';
export type HeadlineFont = 'cormorant' | 'playfair' | 'fraunces' | 'ebgaramond';
export type BodyFont = 'dm' | 'inter' | 'plex' | 'sohne';
export type HeroLayout = 'split' | 'fullbleed' | 'typo' | 'editorial';
export type GridLayout = 'cols2' | 'masonry' | 'editorial' | 'list';
export type Density = 'loose' | 'medium' | 'dense';
export type ImageStyle = 'placeholder' | 'mono' | 'paper';
export type HeadlineVariant = 'default' | 'spaces' | 'briefs';

export interface TweakState {
  theme: ThemeKey;
  accent: AccentKey;
  hfont: HeadlineFont;
  bfont: BodyFont;
  hero: HeroLayout;
  grid: GridLayout;
  density: Density;
  images: ImageStyle;
  headline: HeadlineVariant;
  headlineSize: number;
  dark: boolean;
  eyebrow: boolean;
  reveal: boolean;
  lang: Locale;
}

export type TweakKey = keyof TweakState;
