import type { ImageMetadata } from "astro";

export function coverSrc(cover?: ImageMetadata | string): string | undefined {
  if (!cover) return undefined;
  return typeof cover === "string" ? cover : cover.src;
}
