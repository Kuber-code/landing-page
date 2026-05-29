import type { ImageMetadata } from 'astro';

// Eagerly load every project image. Folder name under projects/ is the slug,
// which must match the project markdown filename (entry id).
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

/** Numeric-aware sort key so "2.png" comes before "10.png". */
const fileOrder = (filePath: string): number => {
  const file = filePath.split('/').pop() ?? '';
  const match = file.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
};

const bySlug = new Map<string, ImageMetadata[]>();

const entries = Object.entries(modules)
  .map(([filePath, mod]) => ({ filePath, img: mod.default }))
  .sort((a, b) => fileOrder(a.filePath) - fileOrder(b.filePath));

for (const { filePath, img } of entries) {
  const parts = filePath.split('/');
  const slug = parts[parts.length - 2]; // .../projects/<slug>/<file>
  const list = bySlug.get(slug) ?? [];
  list.push(img);
  bySlug.set(slug, list);
}

export const getProjectImages = (slug: string): ImageMetadata[] => bySlug.get(slug) ?? [];

export const getCover = (slug: string): ImageMetadata | undefined =>
  getProjectImages(slug)[0];
