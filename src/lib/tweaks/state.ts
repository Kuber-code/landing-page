import type { TweakKey, TweakState } from '@/types/tweaks';
import { DEFAULT_TWEAKS, STORAGE_KEY } from './defaults';

/** Read state from localStorage. Returns defaults on parse failure / SSR. */
export const loadState = (): TweakState => {
  if (typeof window === 'undefined') return { ...DEFAULT_TWEAKS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_TWEAKS };
    const parsed = JSON.parse(raw) as Partial<TweakState>;
    return { ...DEFAULT_TWEAKS, ...parsed };
  } catch {
    return { ...DEFAULT_TWEAKS };
  }
};

export const saveState = (state: TweakState): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / privacy mode — ignore */
  }
};

/** Apply state to <html> dataset + CSS variables. Safe to call repeatedly. */
export const applyState = (state: TweakState): void => {
  const html = document.documentElement;
  html.dataset.theme = state.theme;
  html.dataset.accent = state.accent;
  html.dataset.hfont = state.hfont;
  html.dataset.bfont = state.bfont;
  html.dataset.hero = state.hero;
  html.dataset.grid = state.grid;
  html.dataset.density = state.density;
  html.dataset.images = state.images;
  html.dataset.headline = state.headline;
  html.dataset.dark = state.dark ? 'on' : 'off';
  html.dataset.eyebrow = state.eyebrow ? 'on' : 'off';
  html.dataset.reveal = state.reveal ? 'on' : 'off';
  html.style.setProperty('--h1-scale', String(state.headlineSize / 100));
};

/** Inline script content — runs before <body> renders to prevent FOUC. */
export const INLINE_INIT_SCRIPT = `
(function() {
  try {
    var raw = localStorage.getItem('${STORAGE_KEY}');
    var s = ${JSON.stringify(DEFAULT_TWEAKS)};
    if (raw) { try { Object.assign(s, JSON.parse(raw)); } catch(e) {} }
    var h = document.documentElement;
    h.dataset.theme = s.theme;
    h.dataset.accent = s.accent;
    h.dataset.hfont = s.hfont;
    h.dataset.bfont = s.bfont;
    h.dataset.hero = s.hero;
    h.dataset.grid = s.grid;
    h.dataset.density = s.density;
    h.dataset.images = s.images;
    h.dataset.headline = s.headline;
    h.dataset.dark = s.dark ? 'on' : 'off';
    h.dataset.eyebrow = s.eyebrow ? 'on' : 'off';
    h.dataset.reveal = s.reveal ? 'on' : 'off';
    h.style.setProperty('--h1-scale', String(s.headlineSize / 100));
  } catch(e) {}
})();
`.trim();

export type TweakListener = <K extends TweakKey>(key: K, value: TweakState[K]) => void;
