import { createOgImageResponse, ogImageSize } from "@/lib/og-image-response";

export const alt = "Iluminar — materiais elétricos e construção em Sorocaba";
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createOgImageResponse();
}
