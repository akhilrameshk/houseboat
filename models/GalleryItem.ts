import mongoose, { Schema, type Model } from "mongoose";

const GalleryItemSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    caption: { type: String, default: "", maxlength: 200 },
    boat: { type: Schema.Types.ObjectId, ref: "Boat", default: null },
    showOnHome: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GalleryItem: Model<any> = mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
export default GalleryItem;
