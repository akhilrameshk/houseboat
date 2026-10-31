import { connectDB } from "@/lib/db";
import RateLimit from "@/models/RateLimit";

interface RateOptions {
  limit: number;
  windowSec: number;
}

// Fixed-window limiter stored in MongoDB (works across multiple server instances).
export async function rateLimit(key: string, { limit, windowSec }: RateOptions): Promise<{ ok: boolean; retryAfter: number }> {
  await connectDB();
  const now = new Date();
  const doc = await RateLimit.findOneAndUpdate(
    { key, resetAt: { $gt: now } },
    { $inc: { count: 1 } },
    { new: true }
  );
  if (doc) {
    return { ok: doc.count <= limit, retryAfter: Math.ceil((new Date(doc.resetAt).getTime() - now.getTime()) / 1000) };
  }
  await RateLimit.create({ key, count: 1, resetAt: new Date(now.getTime() + windowSec * 1000) });
  return { ok: true, retryAfter: 0 };
}
