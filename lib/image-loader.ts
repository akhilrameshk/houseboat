// Custom next/image loader: Cloudinary does the resizing, so no server-side image processing is needed.
interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width }: LoaderArgs): string {
  if (src.startsWith("https://res.cloudinary.com/") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return src;
}
