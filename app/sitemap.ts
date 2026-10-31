import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import { SEO_PAGES } from "@/lib/seo-pages";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface BoatStub {
  slug: string;
  updatedAt?: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/houseboats"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...SEO_PAGES.map((p) => ({ url: absoluteUrl(`/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: absoluteUrl("/gallery"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/about-us"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact-us"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
  try {
    await connectDB();
    const boats = (await Boat.find({ active: true }).select("slug updatedAt").lean()) as unknown as BoatStub[];
    return [
      ...pages,
      ...boats.map((b) => ({ url: absoluteUrl(`/houseboats/${b.slug}`), lastModified: b.updatedAt ?? now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ];
  } catch {
    return pages;
  }
}
