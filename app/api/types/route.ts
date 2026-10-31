import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import BoatType from "@/models/BoatType";
import { guardAdmin, json, parseJson } from "@/lib/security";
import { typeSchema } from "@/lib/validators";
import { slugify } from "@/lib/slug";
import { plain } from "@/lib/serialize";
import type { BoatTypeDTO } from "@/types";

export async function GET() {
  await connectDB();
  const types = await BoatType.find().sort({ name: 1 }).lean();
  return json({ types: plain<BoatTypeDTO[]>(types) });
}

export async function POST(request: NextRequest) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const p = await parseJson(request, typeSchema);
  if (p.error) return p.error;
  await connectDB();
  const slug = slugify(p.data.name);
  const existing = await BoatType.findOne({ slug }).lean();
  if (existing) return json({ type: plain<BoatTypeDTO>(existing) });
  const type = await BoatType.create({ name: p.data.name, slug });
  return json({ type: plain<BoatTypeDTO>(type) }, 201);
}
