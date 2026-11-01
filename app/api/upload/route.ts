import type { NextRequest } from "next/server";
import { guardAdmin, json } from "@/lib/security";
import { rateLimit } from "@/lib/rateLimit";
import { uploadBuffer } from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

// Check the real file signature, not just the declared MIME type.
function detectImage(buf: Buffer): "jpeg" | "png" | "webp" | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  return null;
}

export async function POST(request: NextRequest) {
  const g = await guardAdmin(request);
  if (g.error) return g.error;
  const rl = await rateLimit(`upload:${g.session.sub}`, { limit: 200, windowSec: 3600 });
  if (!rl.ok) return json({ error: "Upload limit reached. Try again later." }, 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form data" }, 400);
  }
  const file = form.get("file");
  if (!file || typeof file === "string") return json({ error: "No file" }, 400);
  if (file.size > MAX_BYTES) return json({ error: "Image must be 8 MB or smaller" }, 413);

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!detectImage(buffer)) return json({ error: "Only JPG, PNG or WebP images are allowed" }, 400);

  try {
    const res = await uploadBuffer(buffer);
    return json({ url: res.secure_url, publicId: res.public_id, width: res.width, height: res.height }, 201);
  } catch(error) {
    console.log(error)
    return json({ error: "Upload failed" }, 502);
  }
}
