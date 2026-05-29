/** Padded ordinal: 1 → "01", 12 → "12" */
export const pad = (n: number, width = 2): string => String(n).padStart(width, '0');

/** Clamp a number between min and max. */
export const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n));
