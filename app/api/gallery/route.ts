import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/models/GalleryItem";
import { guardAdmin, json, parseJson } from "@/lib/security";
import { gallerySchema } from "@/lib/validators";
import { plain } from "@/lib/serialize";
import type { GalleryItemDTO } from "@/types";

export async function GET(request: NextRequest) {
  const home = new URL(request.url).searchParams.get("home") === "1";
  await connectDB();
  const items = await GalleryItem.find(home ? { showOnHome: true } : {}).sort({ createdAt: -1 }).limit(200).lean();
  return json({ items: plain<GalleryItemDTO[]>(items) });
}

export async function POST(request: NextRequest) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const p = await parseJson(request, gallerySchema);
  if (p.error) return p.error;
  await connectDB();
  const item = await GalleryItem.create(p.data);
  return json({ item: plain<GalleryItemDTO>(item) }, 201);
}
