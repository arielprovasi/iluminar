import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import path from "node:path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const toPublicImageUrl = (fileName: string) =>
  `/images/services/${fileName
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;

export async function GET() {
  try {
    const servicesDir = path.join(process.cwd(), "public", "images", "services");
    const files = await readdir(servicesDir, { withFileTypes: true });

    const images = files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => ALLOWED_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
      .map((fileName) => toPublicImageUrl(fileName));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
