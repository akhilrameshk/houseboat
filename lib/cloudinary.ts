import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function uploadBuffer(buffer: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "alleppey-mermaid",
        resource_type: "image",
        transformation: [{ width: 2400, height: 2400, crop: "limit", quality: "auto" }],
      },
      (err, res) => (err || !res ? reject(err ?? new Error("Upload failed")) : resolve(res))
    );
    stream.end(buffer);
  });
}

export async function destroyImages(ids: Array<string | undefined | null> = []): Promise<void> {
  await Promise.allSettled(
    ids.filter((id): id is string => Boolean(id)).map((id) => cloudinary.uploader.destroy(id))
  );
}
