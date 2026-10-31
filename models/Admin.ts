import mongoose, { Schema, type Model } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

// Models are loosely typed; data is typed through the DTOs in /types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Admin: Model<any> = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
