import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const ateliers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ateliers" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number(),
    active: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    surtitle: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { ateliers, pages };
