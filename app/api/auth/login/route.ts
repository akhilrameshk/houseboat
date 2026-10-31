import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { createSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { checkOrigin, getIp, json, parseJson } from "@/lib/security";
import { loginSchema } from "@/lib/validators";

let dummyHash: string | undefined;

export async function POST(request: NextRequest) {
  if (!checkOrigin(request)) return json({ error: "Bad origin" }, 403);
  const p = await parseJson(request, loginSchema);
  if (p.error) return p.error;

  const ip = getIp(request);
  const email = p.data.email.toLowerCase();
  const [a, b] = await Promise.all([
    rateLimit(`login:${ip}:${email}`, { limit: 5, windowSec: 15 * 60 }),
    rateLimit(`login-ip:${ip}`, { limit: 20, windowSec: 15 * 60 }),
  ]);
  if (!a.ok || !b.ok) return json({ error: "Too many attempts. Try again later." }, 429);

  await connectDB();
  const admin = await Admin.findOne({ email });
  // Compare against a dummy hash when the user does not exist (keeps timing similar).
  dummyHash ??= bcrypt.hashSync("not-a-real-password", 12);
  const ok = await bcrypt.compare(p.data.password, admin?.passwordHash ?? dummyHash);
  if (!admin || !ok) return json({ error: "Invalid email or password" }, 401);

  await createSession(String(admin._id));
  return json({ ok: true });
}
