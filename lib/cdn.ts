// Cloudinary delivery URL with auto format, auto quality and a width (used for metadata / OG images).
export function cdn(url: string | undefined | null, w: number = 800): string {
  return url ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`) : "";
}
