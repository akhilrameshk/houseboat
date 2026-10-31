import Image from "next/image";

// public/logo.png is 700 x 508. Pass the display height; width follows the ratio.
export default function Logo({ height = 100, alt = "Alleppey Mermaid Houseboats logo", priority = false }: { height?: number; alt?: string; priority?: boolean }) {
  return <Image src="/logo.png" alt={alt} width={100} height={height} priority={priority} unoptimized style={{ display: "block", width: "auto", height }} />;
}
