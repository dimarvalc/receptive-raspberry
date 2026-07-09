import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Existing Cachets Document Database Layout Configuration
const cachets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/cachets" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    sequence: z.string(),
    envelopeSize: z.string(),
    hasBack: z.boolean(),
    hasCancel: z.boolean(),
    imageStem: z.string(),
  }),
});

// 2. NEW Restorations Document Database Layout Configuration
const restorations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/restorations" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    sequence: z.string(),
    imageStem: z.string(), // Links to restoration-before and restoration-after files
  }),
});

// 3. Export both schemas cleanly into your master database framework engine
export const collections = { cachets, restorations };
