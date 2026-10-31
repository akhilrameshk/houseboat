import mongoose, { Schema, type Model } from "mongoose";

const RateLimitSchema = new Schema({
  key: { type: String, required: true, index: true },
  count: { type: Number, default: 1 },
  resetAt: { type: Date, required: true },
});
RateLimitSchema.index({ resetAt: 1 }, { expireAfterSeconds: 0 }); // TTL cleanup

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RateLimit: Model<any> = mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema);
export default RateLimit;
