import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const dataDir = path.join(publicDir, "data");
const galleryDir = path.join(publicDir, "images", "gallery");
const servicesDir = path.join(publicDir, "images", "services");
const serviceFileOrder = ["eletrica.jpg", "iluminacao.jpg", "hidraulica.jpg"];

const encodePath = (segments) => segments.map((part) => encodeURIComponent(part)).join("/");

const isAllowedImage = (fileName) =>
  IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());

const toGalleryItem = (fileName) => ({
  src: `/${encodePath(["images", "gallery", fileName])}`,
  alt: `Store photo - ${fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")}`,
});

const readDirectoryFileNames = async (directoryPath) => {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter(isAllowedImage);
};

const writeManifest = async (fileName, payload) => {
  await mkdir(dataDir, { recursive: true });
  await writeFile(
    path.join(dataDir, fileName),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8",
  );
};

const main = async () => {
  const galleryFileNames = await readDirectoryFileNames(galleryDir);
  galleryFileNames.sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
  const galleryImages = galleryFileNames.map(toGalleryItem);

  const serviceFileNames = new Set(await readDirectoryFileNames(servicesDir));
  const serviceImages = serviceFileOrder.map((fileName) => {
    if (!serviceFileNames.has(fileName)) return null;
    return `/${encodePath(["images", "services", fileName])}`;
  });

  await Promise.all([
    writeManifest("gallery-images.json", { images: galleryImages }),
    writeManifest("service-images.json", { images: serviceImages }),
  ]);

  console.log(`Generated ${galleryImages.length} gallery images`);
};

main().catch((error) => {
  console.error("Failed to generate image manifests");
  console.error(error);
  process.exit(1);
});
