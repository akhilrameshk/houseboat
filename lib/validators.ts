import { z } from "zod";

const slugRe = /^[a-z0-9-]{1,60}$/;
const cloudUrl = z
  .string()
  .url()
  .max(500)
  .refine((u) => u.startsWith("https://res.cloudinary.com/"), "Invalid image URL");
const httpsUrlOrEmpty = z
  .string()
  .url()
  .max(500)
  .refine((u) => u.startsWith("https://"), "Must start with https://")
  .or(z.literal(""))
  .default("");
const txt = (n: number) => z.string().trim().max(n).default("");
const phone = z.string().regex(/^[0-9]{8,15}$/, "Digits only, with country code").or(z.literal("")).default("");
const coord = z.string().trim().regex(/^-?[0-9]{1,3}(\.[0-9]{1,10})?$/, "Use a number like 9.4981").or(z.literal("")).default("");
const dim = z.number().int().min(0).max(20000).default(0);

export const imageSchema = z.object({
  url: cloudUrl,
  publicId: z.string().max(200).default(""),
  width: dim,
  height: dim,
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});

export const passwordSchema = z.object({
  current: z.string().min(1).max(200),
  next: z.string().min(10, "Use at least 10 characters").max(200),
});

export const boatSchema = z.object({
  name: z.string().trim().min(2).max(120),
  type: z.string().regex(slugRe),
  description: txt(5000),
  capacity: txt(100),
  duration: txt(100),
  price: z.number().min(0).max(10000000).nullable().default(null),
  routeFrom: txt(120),
  routeTo: txt(120),
  routeStops: txt(300),
  routeImage: imageSchema.nullable().default(null),
  images: z.array(imageSchema).max(30).default([]),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  showInHomeGallery: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(9999).default(0),
  seoTitle: txt(70),
  seoDescription: txt(170),
});

export const typeSchema = z.object({ name: z.string().trim().min(2).max(40) });

export const gallerySchema = z.object({
  url: cloudUrl,
  publicId: z.string().max(200).default(""),
  width: dim,
  height: dim,
  caption: txt(200),
  boat: z.string().regex(/^[a-f0-9]{24}$/).nullable().default(null),
  showOnHome: z.boolean().default(true),
});
export const galleryUpdateSchema = gallerySchema.pick({ caption: true, boat: true, showOnHome: true });

export const settingsSchema = z.object({
  siteName: txt(100),
  whatsappNumber: phone,
  callNumber: phone,
  email: z.string().trim().email().max(200).or(z.literal("")).default(""),
  address: txt(200),
  googleReviewUrl: httpsUrlOrEmpty,
  googleMapsUrl: httpsUrlOrEmpty,
  footerText: txt(300),
  heroImage: cloudUrl.or(z.literal("")).default(""),
  instagramUrl: httpsUrlOrEmpty,
  facebookUrl: httpsUrlOrEmpty,
  youtubeUrl: httpsUrlOrEmpty,
  tripadvisorUrl: httpsUrlOrEmpty,
  latitude: coord,
  longitude: coord,
  googleVerification: z.string().trim().regex(/^[A-Za-z0-9_-]{0,100}$/, "Letters, numbers, - and _ only").default(""),
  extraKeywords: txt(500),
});
