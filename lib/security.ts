import { NextResponse } from "next/server";
import { z, type ZodTypeAny } from "zod";
import type { JWTPayload } from "jose";
import { requireAdmin } from "@/lib/auth";

export const json = (data: unknown, status: number = 200): NextResponse => NextResponse.json(data, { status });
export const unauthorized = (): NextResponse => json({ error: "Unauthorized" }, 401);
export const notFound = (): NextResponse => json({ error: "Not found" }, 404);

export function getIp(request: Request): string {
  // Behind Cloudflare / nginx the real IP is in these headers.
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

// CSRF defence for cookie-authenticated writes: Origin must match our host.
export function checkOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export type Guard = { error: NextResponse; session?: undefined } | { session: JWTPayload; error?: undefined };

// Use at the top of every admin API handler.
export async function guardAdmin(request: Request): Promise<Guard> {
  if (request.method !== "GET" && !checkOrigin(request)) {
    return { error: json({ error: "Bad origin" }, 403) };
  }
  const session = await requireAdmin();
  if (!session) return { error: unauthorized() };
  return { session };
}

export type Parsed<T> = { data: T; error?: undefined } | { data?: undefined; error: NextResponse };

export async function parseJson<S extends ZodTypeAny>(request: Request, schema: S): Promise<Parsed<z.infer<S>>> {
  const len = Number(request.headers.get("content-length") || 0);
  if (len > 1_000_000) return { error: json({ error: "Payload too large" }, 413) };
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: json({ error: "Invalid JSON" }, 400) };
  }
  const r = schema.safeParse(body);
  if (!r.success) {
    return {
      error: json(
        { error: "Invalid input", details: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`) },
        400
      ),
    };
  }
  return { data: r.data as z.infer<S> };
}

export const isObjectId = (id: string): boolean => /^[a-f0-9]{24}$/.test(String(id));
