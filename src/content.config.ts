import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Philatelic Envelopes
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

// 2. AI Photo Restorations
const restorations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/restorations" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    sequence: z.string(),
    imageStem: z.string(),
  }),
});

// 3. Banknotes Archive (Tracks front/back views and denomination sets)
const banknotes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/banknotes" }),
  schema: z.object({
    title: z.string(),
    country: z.string(),
    denomination: z.string(),
    seriesYear: z.string(),
    sequence: z.string(),
    setName: z.string(), // Groups individual notes into full sets (e.g. "1954 Emergency Issue")
    imageStem: z.string(),
  }),
});

// 4. Stocks Ledger (Tracks shared quantities and specific color varieties)
const stocks = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/stocks" }),
  schema: z.object({
    title: z.string(), // Company Name (e.g., "Puerto Rico Racing Association")
    pubDate: z.coerce.date(),
    sharesCount: z.string(), // e.g., "1 Share", "100 Shares"
    colorVariety: z.string(), // e.g., "Orange Border", "Green Border"
    sequence: z.string(),
    companyStem: z.string(), // Groups shared entities together (e.g., "pr-racing-assoc")
    imageStem: z.string(), // Individual asset key
  }),
});

export const collections = { cachets, restorations, banknotes, stocks };
