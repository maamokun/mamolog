import { getCollection } from "astro:content";

export const getPublishedPosts = () =>
  getCollection("blog", ({ data }) => (import.meta.env.PROD ? !data.draft : true));
