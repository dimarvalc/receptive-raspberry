import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { cachets };
