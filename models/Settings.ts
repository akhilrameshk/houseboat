import mongoose, { Schema, type Model } from "mongoose";

const str = { type: String, default: "" };

const SettingsSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true },
    siteName: str,
    whatsappNumber: str,
    callNumber: str,
    email: str,
    address: str,
    googleReviewUrl: str,
    googleMapsUrl: str,
    footerText: str,
    heroImage: str,
    instagramUrl: str,
    facebookUrl: str,
    youtubeUrl: str,
    tripadvisorUrl: str,
    latitude: str,
    longitude: str,
    googleVerification: str,
    extraKeywords: str,
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Settings: Model<any> = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
export default Settings;
