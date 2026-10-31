import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { rateLimit } from "@/lib/rateLimit";
import { guardAdmin, json, parseJson } from "@/lib/security";
import { passwordSchema } from "@/lib/validators";

export async function PUT(request: NextRequest) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const rl = await rateLimit(`pwd:${g.session.sub}`, { limit: 5, windowSec: 15 * 60 });
  if (!rl.ok) return json({ error: "Too many attempts. Try again later." }, 429);
  const p = await parseJson(request, passwordSchema);
  if (p.error) return p.error;

  await connectDB();
  const admin = await Admin.findById(g.session.sub);
  if (!admin || !(await bcrypt.compare(p.data.current, admin.passwordHash))) {
    return json({ error: "Current password is incorrect" }, 400);
  }
  admin.passwordHash = await bcrypt.hash(p.data.next, 12);
  await admin.save();
  return json({ ok: true });
}
