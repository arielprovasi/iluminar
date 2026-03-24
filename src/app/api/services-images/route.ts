import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import path from "node:path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Same order as `services` in src/config/site.ts (Elétrica → Iluminação → Hidráulica). */
const SERVICE_IMAGE_FILES = ["eletrica.jpg", "iluminacao.jpg", "hidraulica.jpg"] as const;

const toPublicImageUrl = (fileName: string) =>
  `/images/services/${fileName
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;

export async function GET() {
  try {
    const servicesDir = path.join(process.cwd(), "public", "images", "services");
    const files = await readdir(servicesDir, { withFileTypes: true });

    const fileNames = new Set(
      files.filter((entry) => entry.isFile()).map((entry) => entry.name),
    );

    const images = SERVICE_IMAGE_FILES.map((fileName) => {
      const ext = path.extname(fileName).toLowerCase();
      if (!fileNames.has(fileName) || !ALLOWED_EXTENSIONS.has(ext)) {
        return null;
      }
      return toPublicImageUrl(fileName);
    });

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
