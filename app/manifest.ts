import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Mermaid Houseboats",
    description: "Houseboat tours, kayaking and shikara rides in Alleppey, Kerala.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#04385B",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
