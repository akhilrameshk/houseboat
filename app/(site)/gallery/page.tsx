import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/models/GalleryItem";
import PhotoGrid from "@/components/PhotoGrid";
import Hero from "@/components/Hero";
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
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 10 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Backwater Photo Gallery"
        subtitle="Browse authentic moments from our luxury houseboats, traditional shikaras, and tranquil backwater cruises in Alappuzha."
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        {items.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 8 }}>
            Photos will appear here soon.
          </Typography>
        ) : (
          <PhotoGrid images={items} />
        )}
      </Container>
    </Box>
  );
}