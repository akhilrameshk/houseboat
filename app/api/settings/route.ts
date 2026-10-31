import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";
import { getSettings } from "@/lib/settings";
import { guardAdmin, json, parseJson } from "@/lib/security";
import { settingsSchema } from "@/lib/validators";

export async function GET() {
  return json({ settings: await getSettings() });
}

export async function PUT(request: NextRequest) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const p = await parseJson(request, settingsSchema);
  if (p.error) return p.error;
  await connectDB();
  await Settings.findOneAndUpdate({ key: "main" }, { $set: p.data }, { upsert: true });
  return json({ ok: true });
}
