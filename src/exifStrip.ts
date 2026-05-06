import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".heif", ".heic"];

async function getAllImageFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await getAllImageFiles(fullPath)));
      } else if (entry.isFile()) {
        const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf("."));
        if (IMAGE_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(
      `Skipping directory ${dir}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  return files;
}

async function stripExifFromImage(filePath: string): Promise<void> {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (metadata.exif || metadata.xmp || metadata.iptc) {
      const buffer = await image.withMetadata({}).toBuffer();

      await writeFile(filePath, buffer);

      console.log(`Stripped EXIF from: ${filePath}`);
    }
  } catch (error) {
    console.error(
      `Failed to process ${filePath}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

async function main() {
  const directories = [join(process.cwd(), "public"), join(process.cwd(), "src", "assets")];

  let allImageFiles: string[] = [];

  for (const dir of directories) {
    const images = await getAllImageFiles(dir);
    allImageFiles = allImageFiles.concat(images);
  }

  if (allImageFiles.length === 0) {
    console.log("No images found to process");
    return;
  }

  console.log(`Processing ${allImageFiles.length} image(s)...`);

  await Promise.all(allImageFiles.map(stripExifFromImage));

  console.log("EXIF stripping complete");
}

main().catch(console.error);
