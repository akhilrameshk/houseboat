// Usage: npm run create-admin   (reads ADMIN_EMAIL / ADMIN_PASSWORD from .env.local)
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function main(): Promise<void> {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env.local");
    process.exit(1);
  }
  if (ADMIN_PASSWORD.length < 10) {
    console.error("ADMIN_PASSWORD must be at least 10 characters");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  const Admin = mongoose.model(
    "Admin",
    new mongoose.Schema(
      { email: { type: String, unique: true, lowercase: true, trim: true }, passwordHash: String },
      { timestamps: true }
    )
  );
  const email = ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.findOneAndUpdate({ email }, { email, passwordHash }, { upsert: true });
  console.log(`Admin ready: ${email}`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
