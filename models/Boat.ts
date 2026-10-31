import mongoose, { Schema, type Model } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  { _id: false }
);

const BoatSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true, index: true }, // BoatType slug
    description: { type: String, default: "", maxlength: 5000 },
    capacity: { type: String, default: "", maxlength: 100 },
    duration: { type: String, default: "", maxlength: 100 },
    price: { type: Number, default: null, min: 0 },
    routeFrom: { type: String, default: "", maxlength: 120 },
    routeTo: { type: String, default: "", maxlength: 120 },
    routeStops: { type: String, default: "", maxlength: 300 },
    routeImage: { type: ImageSchema, default: null },
    images: { type: [ImageSchema], default: [] },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true, index: true },
    showInHomeGallery: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seoTitle: { type: String, default: "", maxlength: 70 },
    seoDescription: { type: String, default: "", maxlength: 170 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Boat: Model<any> = mongoose.models.Boat || mongoose.model("Boat", BoatSchema);
export default Boat;
