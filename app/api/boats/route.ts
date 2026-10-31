import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import { guardAdmin, json, parseJson } from "@/lib/security";
import { boatSchema } from "@/lib/validators";
import { uniqueSlug } from "@/lib/boats";
import { plain } from "@/lib/serialize";
import type { BoatDTO } from "@/types";

// Public: active boats, optionally filtered by ?type=slug
export async function GET(request: NextRequest) {
  const type = new URL(request.url).searchParams.get("type");
  await connectDB();
  const valid = type && /^[a-z0-9-]{1,60}$/.test(type) ? type : null;
  const boats = await Boat.find(valid ? { active: true, type: valid } : { active: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(100)
    .lean();
  return json({ boats: plain<BoatDTO[]>(boats) });
}

// Admin: create
export async function POST(request: NextRequest) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const p = await parseJson(request, boatSchema);
  if (p.error) return p.error;
  await connectDB();
  const slug = await uniqueSlug(p.data.name);
  const boat = await Boat.create({ ...p.data, slug });
  return json({ boat: plain<BoatDTO>(boat) }, 201);
}
