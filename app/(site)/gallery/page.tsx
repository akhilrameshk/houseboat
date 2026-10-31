import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/models/GalleryItem";
import PhotoGrid from "@/components/PhotoGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { plain } from "@/lib/serialize";
import { buildMetadata } from "@/lib/seo";
import type { GalleryItemDTO } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Alleppey Houseboat Photo Gallery | Kerala Backwaters",
  description: "Photos of Alleppey houseboats, backwater cruises, kayaking and shikara rides on the Kerala backwaters.",
  path: "/gallery",
  keywords: ["alleppey houseboat photos", "kerala backwaters pictures", "alappuzha houseboat gallery"],
});

export default async function GalleryPage() {
  await connectDB();
  const items = plain<GalleryItemDTO[]>(await GalleryItem.find().sort({ createdAt: -1 }).limit(200).lean());
  return (
    <>
      <Box sx={{ background: "linear-gradient(135deg,#04385B,#0A5C85)", color: "#fff", py: 6 }}>
        <Container maxWidth="lg"  sx={{
          mt:10,}}>
          <Breadcrumbs light items={[{ name: "Gallery", path: "/gallery" }]} />
          <Typography variant="h1" sx={{ fontSize: 40, mb: 1 }}>Gallery</Typography>
          <Typography sx={{ color: "#CFE3EA" }}>Photos from our Alleppey houseboats and backwater trips.</Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {items.length === 0 ? <Typography color="text.secondary">Photos will appear here soon.</Typography> : <PhotoGrid images={items} />}
      </Container>
    </>
  );
}
