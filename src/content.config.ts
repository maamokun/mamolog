import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: ["**/*.{md,mdx}", "!**/_*", "!**/_*/**"],
    base: "./src/content",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      coverImage: z.union([z.string().url(), z.string().startsWith("/"), image()]).optional(),
      date: z.date(),
      timeToRead: z.number().optional(),
      creator: z.string().optional(),
      tags: z.array(z.string()).optional(),
      relatedPosts: z.array(reference("blog")).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
