import type { Metadata } from "next";
import { Box, Container, Grid, Typography, Button, Stack } from "@mui/material";

import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import Hero from "@/components/Hero";
import BoatCard from "@/components/BoatCard";
import { getSettings } from "@/lib/settings";
import { plain } from "@/lib/serialize";
import { buildMetadata } from "@/lib/seo";
import type { BoatDTO, BoatTypeDTO } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const activeType = params.type || "all";
  
  const titleCategory = activeType !== "all" 
    ? `${activeType.charAt(0).toUpperCase() + activeType.slice(1)}s` 
    : "Houseboats & Backwater Cruises";

  return buildMetadata({
    title: `Book ${titleCategory} in Alleppey | Alleppey Mermaid Houseboats`,
    description:
      "Browse luxury houseboats, shikara rides, kayaking tours, and speedboats in Alleppey. View specifications, food menu details, and enquire instantly on WhatsApp.",
    path: "/houseboats",
  });
}

export default async function HouseboatsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.type || "all";
  const settings = await getSettings();

  let types: BoatTypeDTO[] = [];
  let boats: BoatDTO[] = [];

  try {
    await connectDB();
    const [fetchedTypes, fetchedBoats] = await Promise.all([
      BoatType.find().sort({ name: 1 }).lean().then((r) => plain<BoatTypeDTO[]>(r)),
      Boat.find({ active: true })
        .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
        .lean()
        .then((r) => plain<BoatDTO[]>(r)),
    ]);
    types = fetchedTypes;
    boats = fetchedBoats;
  } catch (error) {
    console.warn("Database fetch skipped or empty in boat listing page.", error);
  }

  const typeNameMap = Object.fromEntries(types.map((t) => [t.slug, t.name]));
  const whatsapp = settings.whatsappNumber || "919000000000";

  // Filter boats by selected category if not "all"
  const filteredBoats =
    selectedCategory === "all"
      ? boats
      : boats.filter((b) => b.type === selectedCategory);

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 10 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Explore Our Fleet & Cruise Packages"
        subtitle="Choose from luxury houseboats, traditional shikara rides, guided kayaking tours, and speedboats in Alappuzha."
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Category Filter Buttons */}
        <Stack direction="row" spacing={1.5} sx={{ mb: 4, overflowX: "auto", pb: 1 }}>
          <Button
            component="a"
            href="/houseboats"
            variant={selectedCategory === "all" ? "contained" : "outlined"}
            sx={{
              borderRadius: 4,
              textTransform: "none",
              bgcolor: selectedCategory === "all" ? "#042842" : "transparent",
              color: selectedCategory === "all" ? "#fff" : "#042842",
              borderColor: "#042842",
              "&:hover": { bgcolor: selectedCategory === "all" ? "#031D30" : "rgba(4,40,66,0.05)" },
            }}
          >
            All Boats
          </Button>
          {types.map((t) => (
            <Button
              key={t.slug}
              component="a"
              href={`/houseboats?type=${t.slug}`}
              variant={selectedCategory === t.slug ? "contained" : "outlined"}
              sx={{
                borderRadius: 4,
                textTransform: "none",
                bgcolor: selectedCategory === t.slug ? "#042842" : "transparent",
                color: selectedCategory === t.slug ? "#fff" : "#042842",
                borderColor: "#042842",
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: selectedCategory === t.slug ? "#031D30" : "rgba(4,40,66,0.05)" },
              }}
            >
              {t.name}
            </Button>
          ))}
        </Stack>

        {/* Boats Grid */}
        <Grid container spacing={3}>
          {filteredBoats.map((boat: any) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={boat._id}>
              <BoatCard
                boat={boat}
                typeName={typeNameMap[boat.type] || boat.type}
                whatsapp={whatsapp}
                siteName={settings.siteName}
              />
            </Grid>
          ))}
        </Grid>

        {filteredBoats.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No boats found in this category.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}