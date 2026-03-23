import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import path from "node:path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const toPublicImageUrl = (fileName: string) => {
  const encodedName = fileName
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `/images/gallery/${encodedName}`;
};

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
    const files = await readdir(galleryDir, { withFileTypes: true });

    const images = files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => ALLOWED_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
      .map((fileName) => ({
        src: toPublicImageUrl(fileName),
        alt: `Foto da loja Iluminar - ${fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")}`,
      }));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
