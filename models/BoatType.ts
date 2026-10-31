import mongoose, { Schema, type Model } from "mongoose";

const BoatTypeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 40 },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BoatType: Model<any> = mongoose.models.BoatType || mongoose.model("BoatType", BoatTypeSchema);
export default BoatType;
