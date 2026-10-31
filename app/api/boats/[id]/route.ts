import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import GalleryItem from "@/models/GalleryItem";
import { guardAdmin, isObjectId, json, notFound, parseJson } from "@/lib/security";
import { boatSchema } from "@/lib/validators";
import { destroyImages } from "@/lib/cloudinary";
import { plain } from "@/lib/serialize";
import type { BoatDTO, ImageDTO } from "@/types";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Ctx) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const { id } = await params;
  if (!isObjectId(id)) return notFound();
  const p = await parseJson(request, boatSchema);
  if (p.error) return p.error;

  await connectDB();
  const boat = await Boat.findById(id);
  if (!boat) return notFound();

  const keep = new Set<string>(
    [p.data.routeImage?.publicId, ...p.data.images.map((i) => i.publicId)].filter((x): x is string => Boolean(x))
  );
  const oldIds: string[] = [boat.routeImage?.publicId, ...(boat.images as ImageDTO[]).map((i) => i.publicId)].filter(
    (x: string | undefined): x is string => Boolean(x)
  );
  const removed = oldIds.filter((pid) => !keep.has(pid));

  boat.set(p.data); // slug is intentionally not changed on rename
  await boat.save();
  void destroyImages(removed); // best effort, not awaited
  return json({ boat: plain<BoatDTO>(boat) });
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const { id } = await params;
  if (!isObjectId(id)) return notFound();
  await connectDB();
  const boat = await Boat.findByIdAndDelete(id);
  if (!boat) return notFound();
  await GalleryItem.updateMany({ boat: id }, { $set: { boat: null } });
  void destroyImages([boat.routeImage?.publicId, ...(boat.images as ImageDTO[]).map((i) => i.publicId)]);
  return json({ ok: true });
}
