import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/types';

export type Project = CollectionEntry<'projects'>;

/** Localized project view — flattens name/description for a given locale. */
export interface LocalizedProject {
  slug: string;
  cat: Project['data']['cat'];
  year: number;
  location: string;
  role: string;
  type: string;
  area: string;
  status: string;
  team: string;
  name: string;
  description: string[];
  order: number;
}

export const localize = (entry: Project, locale: Locale): LocalizedProject => ({
  slug: entry.id,
  cat: entry.data.cat,
  year: entry.data.year,
  location: entry.data.location,
  role: entry.data.role,
  type: entry.data.type,
  area: entry.data.area,
  status: entry.data.status,
  team: entry.data.team,
  order: entry.data.order,
  name: entry.data.name[locale],
  description: entry.data.description[locale],
});

export const getProjects = async (locale: Locale): Promise<LocalizedProject[]> => {
  const all = await getCollection('projects');
  return all
    .map((entry) => localize(entry, locale))
    .sort((a, b) => a.order - b.order);
};

export const getProject = async (
  slug: string,
  locale: Locale,
): Promise<LocalizedProject | undefined> => {
  const all = await getProjects(locale);
  return all.find((p) => p.slug === slug);
};
