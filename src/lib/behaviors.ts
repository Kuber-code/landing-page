/**
 * Generic IntersectionObserver-based reveal: any element with `.reveal`
 * receives `.is-revealed` when ≥12% in view. No-op if disabled at root.
 */
export const setupRevealObserver = (): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-revealed');
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll<HTMLElement>('.reveal:not(.is-revealed)').forEach((el) => io.observe(el));
  return io;
};

/** Lightweight follower dot — appears over [data-cursor-hover] surfaces. */
let _cursorAC: AbortController | null = null;
export const setupCursorFollower = (selector = '#cursor-dot'): void => {
  _cursorAC?.abort();
  _cursorAC = new AbortController();
  const dot = document.querySelector<HTMLElement>(selector);
  if (!dot) return;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let rafId = 0;
  const loop = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    dot.style.left = `${cx}px`;
    dot.style.top = `${cy}px`;
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
  _cursorAC.signal.addEventListener('abort', () => cancelAnimationFrame(rafId));
  document.addEventListener(
    'mousemove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement).closest('[data-cursor-hover]');
      dot.classList.toggle('is-active', Boolean(target));
    },
    { signal: _cursorAC.signal },
  );
};

/** Sticky-nav scroll state. */
let _navScrollAC: AbortController | null = null;
export const setupNavScroll = (selector = '#nav'): void => {
  _navScrollAC?.abort();
  _navScrollAC = new AbortController();
  const nav = document.querySelector<HTMLElement>(selector);
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true, signal: _navScrollAC.signal });
  onScroll();
};

/** Animated number counters (data-count="42"). */
export const setupCounters = (root: ParentNode = document): void => {
  const els = root.querySelectorAll<HTMLElement>('[data-count]');
  if (els.length === 0) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target as HTMLElement;
        const target = Number(el.dataset.count ?? '0');
        const start = performance.now();
        const dur = 1400;
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased)).padStart(2, '0');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
};

/** IntersectionObserver-based active section tracker — highlights matching nav link. */
let _activeSectionsIO: IntersectionObserver | null = null;
export const setupActiveSections = (): void => {
  _activeSectionsIO?.disconnect();
  const links = document.querySelectorAll<HTMLElement>('.nav__link[data-section]');
  if (!links.length) return;
  _activeSectionsIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const id = (e.target as HTMLElement).id;
        links.forEach((l) => l.classList.toggle('is-active', l.dataset.section === id));
      }
    },
    { threshold: 0, rootMargin: '0px 0px -80% 0px' },
  );
  document.querySelectorAll<HTMLElement>('section[id]').forEach((s) => _activeSectionsIO!.observe(s));
};

/** Cycling text at #nav-badge .badge-text — receives phrases from caller. */
let _badgeIntervalId = 0;
export const setupBadgeCycler = (phrases: readonly string[], everyMs = 3800): void => {
  clearInterval(_badgeIntervalId);
  const text = document.querySelector<HTMLElement>('#nav-badge .badge-text');
  if (!text || phrases.length === 0) return;
  let i = 0;
  _badgeIntervalId = window.setInterval(() => {
    text.style.transition = 'opacity .35s';
    text.style.opacity = '0';
    window.setTimeout(() => {
      i = (i + 1) % phrases.length;
      text.textContent = phrases[i] ?? '';
      text.style.opacity = '1';
    }, 360);
  }, everyMs);
};
