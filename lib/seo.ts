import type { Metadata } from "next";

export const SITE_NAME = "Alleppey Mermaid Houseboats";
export const DEFAULT_OG = "/og-image.jpg";

// Core search phrases for Alleppey / Alappuzha tourism (used in meta keywords and structured data).
export const BASE_KEYWORDS: string[] = [
  "alleppey houseboat",
  "alappuzha houseboat",
  "alleppey houseboat booking",
  "alleppey houseboat packages",
  "alleppey boat house",
  "kerala houseboat",
  "kerala backwaters",
  "kerala backwater tour",
  "luxury houseboat alleppey",
  "ac houseboat alleppey",
  "alleppey day cruise",
  "overnight houseboat alleppey",
  "alleppey honeymoon houseboat",
  "family houseboat alleppey",
  "alleppey kayaking",
  "shikara boat ride alleppey",
  "alleppey backwater tour",
  "vembanad lake houseboat",
  "kuttanad backwaters",
  "houseboat stay kerala",
  "alleppey mermaid houseboats",
];

export const AREAS_SERVED: string[] = ["Alleppey", "Alappuzha", "Punnamada", "Vembanad Lake", "Kuttanad", "Kumarakom", "Kerala"];

export const siteUrl = (): string => (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const absoluteUrl = (path: string = "/"): string => `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;

export function mergeKeywords(...lists: Array<string[] | string | undefined>): string[] {
  const out = new Set<string>();
  for (const l of lists) {
    const items = typeof l === "string" ? l.split(",") : l ?? [];
    for (const k of items) {
      const t = k.trim().toLowerCase();
      if (t) out.add(t);
    }
  }
  return [...out];
}

interface MetaOptions {
  title: string; // full <title>, keep it under ~60 characters
  description: string; // keep it under ~155 characters
  path: string; // canonical path, e.g. "/houseboats"
  image?: string; // absolute or site-relative image URL (1200x630 works best)
  keywords?: string[];
  noindex?: boolean;
}

export function buildMetadata({ title, description, path, image, keywords, noindex }: MetaOptions): Metadata {
  const img = image || DEFAULT_OG;
  return {
    title: { absolute: title },
    description,
    keywords: mergeKeywords(keywords, BASE_KEYWORDS.slice(0, 8)),
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      url: path,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}
