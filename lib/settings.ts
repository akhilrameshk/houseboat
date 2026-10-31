import { cache } from "react";
import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";
import type { SettingsDTO } from "@/types";

export const settingsDefaults: SettingsDTO = {
  siteName: "Alleppey Mermaid Houseboats",
  whatsappNumber: "",
  callNumber: "",
  email: "",
  address: "Alleppey (Alappuzha), Kerala",
  googleReviewUrl: "",
  googleMapsUrl: "",
  footerText: "Alleppey backwater cruises on houseboats, kayaks and shikaras. Discover · Relax · Reconnect.",
  heroImage: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  tripadvisorUrl: "",
  latitude: "",
  longitude: "",
  googleVerification: "",
  extraKeywords: "",
};

export const getSettings = cache(async (): Promise<SettingsDTO> => {
  try {
    await connectDB();
    const doc = (await Settings.findOne({ key: "main" }).lean()) as Partial<SettingsDTO> | null;
    const out: SettingsDTO = { ...settingsDefaults };
    if (doc) {
      for (const k of Object.keys(settingsDefaults) as (keyof SettingsDTO)[]) {
        const v = doc[k];
        if (typeof v === "string" && v !== "") out[k] = v;
      }
    }
    return out;
  } catch {
    return { ...settingsDefaults };
  }
});
