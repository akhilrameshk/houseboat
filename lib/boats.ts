import Boat from "@/models/Boat";
import { slugify } from "@/lib/slug";

export async function uniqueSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let i = 2;
  while (await Boat.exists(excludeId ? { slug, _id: { $ne: excludeId } } : { slug })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}
