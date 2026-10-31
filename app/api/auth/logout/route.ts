import type { NextRequest } from "next/server";
import { clearSession } from "@/lib/auth";
import { checkOrigin, json } from "@/lib/security";

export async function POST(request: NextRequest) {
  if (!checkOrigin(request)) return json({ error: "Bad origin" }, 403);
  await clearSession();
  return json({ ok: true });
}
