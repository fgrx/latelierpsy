import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const ateliers = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/ateliers" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    image: z.string().optional(),
    bannerImage: z.string().optional(),
    logoImage: image().optional(),
    colorPresentation: z.string().default("bg-brand"),
    order: z.number(),
    isActive: z.boolean().default(false),
    active: z.boolean().default(false).optional(),
    isPro: z.boolean().default(false),
    isForAll: z.boolean().default(false),
    date: z.date().optional(),
    infoHero: z.string().optional(),
    formules: z.array(z.object({
      nom: z.string(),
      prix: z.number(),
      lien: z.string(),
      details: z.array(z.string()),
    })).optional(),
    purchase: z.object({
      price: z.number(),
      buyUrl: z.string(),
    }).optional(),
    problems: z.array(z.string()).optional(),
    programme: z.array(z.object({
      date: z.string().optional(),
      titre: z.string(),
      details: z.array(z.string()).optional(),
    })).optional(),
    pictos: z.array(z.object({
      title: z.string(),
      type: z.string().optional(),
    })).optional(),
    principes: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    publicAdapte: z.array(z.string()).optional(),
    publicNonAdapte: z.array(z.string()).optional(),
    temoignages: z.array(z.object({
      texte: z.string(),
      auteur: z.string(),
    })).optional(),
    faq: z.array(z.string()).optional(),
    suiviMail: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    surtitle: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { ateliers, pages };
