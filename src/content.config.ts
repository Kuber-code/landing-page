import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localizedString = z.object({ en: z.string(), pl: z.string() });
const localizedParagraphs = z.object({
  en: z.array(z.string()),
  pl: z.array(z.string()),
});

export const CATEGORIES = [
  'Residential',
  'Commercial',
  'Interior Design',
  'Urban & Public',
  'Garden',
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    cat: z.enum(CATEGORIES),
    year: z.number(),
    location: z.string(),
    role: z.string(),
    type: z.string(),
    area: z.string(),
    status: z.string(),
    team: z.string(),
    name: localizedString,
    description: localizedParagraphs,
  }),
});

export const collections = { projects };
