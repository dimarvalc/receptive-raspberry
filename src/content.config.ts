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
    event: z.string().optional(),
    isSimulated: z.boolean().optional().default(false),    
    hasBack: z.boolean(),
    hasCancel: z.boolean(),
    imageStem: z.string(),
    designLabKey: z.string().optional(),
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
    title: z.string(),          // e.g., "100 Escudos"
    country: z.string(),        // e.g., "Mozambique"
    catalogNumber: z.string(),  // 🎯 Alphanumeric support for varieties (e.g., "112b", "W345", "206a1")
    denomination: z.string(),   // e.g., "100"
    seriesYear: z.string(),     // e.g., "1976"
    sequence: z.string(),       // Your internal listing placement counter
    setName: z.string().optional(), // Optional grouping for multi-note release issuance runs
    imageStem: z.string(),      // Will perfectly map straight to: "mozambique-119"
  }),
});


// 4. Stocks Ledger (Tracks shared quantities and specific color varieties)
const stocks = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/stocks" }),
  schema: z.object({
    title: z.string(), // Company Name (e.g., "Puerto Rico Racing Association")
    pubDate: z.coerce.date(), // Date when the stock certificate was issued
    cancelDate: z.coerce.date().optional(), // Optional Cancellation Date
    serialNumber: z.string(), // Serial Number of the Certificate
    sharesCount: z.string(), // e.g., "1 Share", "100 Shares"
    colorVariety: z.string(), // e.g., "Orange Border", "Green Border"
    sequence: z.string(),
    companyStem: z.string(), // Groups shared entities together (e.g., "pr-racing-assoc")
    imageStem: z.string(), // Individual asset key
    hasRevenueStamps: z.boolean().default(false),
  }),
});

// 5. COINS COLLECTION ARCHITECTURE
const coins = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/coins" }),
  schema: z.object({
    denomination: z.string(),          // e.g., "20 Centavos"
    country: z.string(),        // e.g., "Puerto Rico"
    mintMark: z.string(),       // e.g., "PG", "S", "D", or "None"
    seriesYear: z.string(),     // e.g., "1896"
    composition: z.string(),    // e.g., "90% Silver", "Copper"
    coinGrade: z.string(),      // e.g., "VF-30", "MS-65", "Circulated"
    sequence: z.string(),       // Internal counter sorting slot
    imageStem: z.string(),      // Base target key for your photos
  }),
});

// src/content.config.ts

// 6. Detailed Creation Logs & Design Process per Event
const designLabs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/design-labs" }),
  schema: z.object({
    title: z.string(),          // e.g., "Designing the 1974 Numismatic Anniversary Cover"
    eventKey: z.string(),       // e.g., "numismatic-1974" (Matches the cachet event parameter)
    pubDate: z.coerce.date(),
    featuredImage: z.string(),  // A main concept image to show on the dashboard
    summary: z.string(),        // Short teaser of the design journey
  }),
});

export const collections = { cachets, restorations, banknotes, stocks, coins, designLabs }; 