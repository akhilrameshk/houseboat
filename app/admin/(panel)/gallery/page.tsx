import { Stack, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/models/GalleryItem";
import Boat from "@/models/Boat";
import GalleryManager from "@/components/GalleryManager";
import { plain } from "@/lib/serialize";
import type { GalleryItemDTO } from "@/types";

export default async function AdminGallery() {
  await connectDB();
  const [items, boats] = await Promise.all([
    GalleryItem.find().sort({ createdAt: -1 }).lean(),
    Boat.find().select("name").sort({ name: 1 }).lean(),
  ]);
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">Gallery</Typography>
      <GalleryManager items={plain<GalleryItemDTO[]>(items)} boats={plain<{ _id: string; name: string }[]>(boats)} />
    </Stack>
  );
}
