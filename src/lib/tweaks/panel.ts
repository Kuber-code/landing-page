import type { TweakKey, TweakState } from '@/types/tweaks';
import { applyState, loadState, saveState, type TweakListener } from './state';

/**
 * TweaksController — single source of truth for in-page tweak state.
 * Subscribes UI controls to state changes and persists to localStorage.
 */
export class TweaksController {
  private state: TweakState;
  private listeners = new Set<TweakListener>();

  constructor() {
    this.state = loadState();
    applyState(this.state);
  }

  get<K extends TweakKey>(key: K): TweakState[K] {
    return this.state[key];
  }

  set<K extends TweakKey>(key: K, value: TweakState[K]): void {
    if (this.state[key] === value) return;
    this.state[key] = value;
    applyState(this.state);
    saveState(this.state);
    this.listeners.forEach((l) => l(key, value));
  }

  subscribe(listener: TweakListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  snapshot(): TweakState {
    return { ...this.state };
  }
}

/** Wire chip/swatch groups (data-tweak-group, data-val) to the controller. */
export const wireGroups = (root: ParentNode, ctrl: TweaksController): void => {
  root.querySelectorAll<HTMLElement>('[data-tweak-group]').forEach((group) => {
    const key = group.dataset.tweakGroup as TweakKey | undefined;
    if (!key) return;
    const buttons = group.querySelectorAll<HTMLButtonElement>('[data-val]');
    const sync = () => {
      const current = String(ctrl.get(key));
      buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.val === current));
    };
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = btn.dataset.val;
        if (v == null) return;
        // numeric coercion for headlineSize is handled via slider — groups are strings/bools
        const parsed: string | boolean = v === 'true' ? true : v === 'false' ? false : v;
        ctrl.set(key, parsed as never);
      });
    });
    ctrl.subscribe((k) => k === key && sync());
    sync();
  });
};

/** Wire toggles (button with .tweak-toggle, data-tweak-key="<bool key>"). */
export const wireToggles = (root: ParentNode, ctrl: TweaksController): void => {
  root.querySelectorAll<HTMLButtonElement>('[data-tweak-toggle]').forEach((btn) => {
    const key = btn.dataset.tweakToggle as TweakKey | undefined;
    if (!key) return;
    const sync = () => btn.classList.toggle('is-on', Boolean(ctrl.get(key)));
    btn.addEventListener('click', () => ctrl.set(key, !ctrl.get(key) as never));
    ctrl.subscribe((k) => k === key && sync());
    sync();
  });
};

/** Wire the headline-size slider. */
export const wireSlider = (root: ParentNode, ctrl: TweaksController): void => {
  const input = root.querySelector<HTMLInputElement>('[data-tweak-slider="headlineSize"]');
  const label = root.querySelector<HTMLElement>('[data-tweak-slider-val="headlineSize"]');
  if (!input) return;
  const sync = () => {
    const v = ctrl.get('headlineSize');
    input.value = String(v);
    if (label) label.textContent = `${v}%`;
  };
  input.addEventListener('input', (e) => {
    const v = Number((e.target as HTMLInputElement).value);
    document.documentElement.style.setProperty('--h1-scale', String(v / 100));
    if (label) label.textContent = `${v}%`;
  });
  input.addEventListener('change', (e) => {
    ctrl.set('headlineSize', Number((e.target as HTMLInputElement).value));
  });
  ctrl.subscribe((k) => k === 'headlineSize' && sync());
  sync();
};

/** Wire open/close + drag for the panel chrome. */
export const wirePanelChrome = (panel: HTMLElement, fab: HTMLElement): void => {
  const show = (open: boolean) => {
    panel.classList.toggle('is-open', open);
    fab.classList.toggle('is-hidden', open);
  };
  fab.addEventListener('click', () => show(true));
  panel.querySelector<HTMLButtonElement>('[data-tweak-close]')?.addEventListener('click', () => show(false));

  const head = panel.querySelector<HTMLElement>('[data-tweak-drag]');
  if (!head) return;
  let dragging = false;
  let sx = 0;
  let sy = 0;
  let ox = 0;
  let oy = 0;
  head.addEventListener('mousedown', (e) => {
    if ((e.target as HTMLElement).closest('button')) return;
    dragging = true;
    const rect = panel.getBoundingClientRect();
    sx = e.clientX;
    sy = e.clientY;
    ox = rect.left;
    oy = rect.top;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.left = `${ox}px`;
    panel.style.top = `${oy}px`;
    e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    panel.style.left = `${ox + e.clientX - sx}px`;
    panel.style.top = `${oy + e.clientY - sy}px`;
  });
  document.addEventListener('mouseup', () => {
    dragging = false;
  });
};
