import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import BoatType from "@/models/BoatType";
import Boat from "@/models/Boat";
import { guardAdmin, isObjectId, json, notFound } from "@/lib/security";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const { id } = await params;
  if (!isObjectId(id)) return notFound();
  await connectDB();
  const type = await BoatType.findById(id);
  if (!type) return notFound();
  if (await Boat.exists({ type: type.slug })) return json({ error: "Type is used by boats" }, 400);
  await type.deleteOne();
  return json({ ok: true });
}
