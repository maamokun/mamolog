import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "@/lib/posts";

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: "mamolog",
    description: "なんだこの自己満ブログ",
    site: context.site ?? "https://log.mamomamo.live",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: "<language>ja</language>",
  });
}
