import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/models/GalleryItem";
import { guardAdmin, isObjectId, json, notFound, parseJson } from "@/lib/security";
import { galleryUpdateSchema } from "@/lib/validators";
import { destroyImages } from "@/lib/cloudinary";
import { plain } from "@/lib/serialize";
import type { GalleryItemDTO } from "@/types";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Ctx) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const { id } = await params;
  if (!isObjectId(id)) return notFound();
  const p = await parseJson(request, galleryUpdateSchema);
  if (p.error) return p.error;
  await connectDB();
  const item = await GalleryItem.findByIdAndUpdate(id, { $set: p.data }, { new: true });
  if (!item) return notFound();
  return json({ item: plain<GalleryItemDTO>(item) });
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const { id } = await params;
  if (!isObjectId(id)) return notFound();
  await connectDB();
  const item = await GalleryItem.findByIdAndDelete(id);
  if (!item) return notFound();
  void destroyImages([item.publicId]);
  return json({ ok: true });
}
