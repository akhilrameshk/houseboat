import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

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

  // Group boats dynamically by type for row-by-row layout
  const groupedBoats = filteredBoats.reduce<Record<string, BoatDTO[]>>((acc, boat) => {
    const boatType = boat.type?.toLowerCase() || "houseboat";
    if (!acc[boatType]) acc[boatType] = [];
    acc[boatType].push(boat);
    return acc;
  }, {});

  // Priority order for rendering rows
  const priorityOrder = ["house-boat", "houseboat", "kayaking", "shikara", "speedboat"];
  const typeDisplayOrder = selectedCategory === "all" 
    ? Array.from(new Set([...priorityOrder, ...Object.keys(groupedBoats)]))
    : [selectedCategory];

  const sectionTitle = {
    fontFamily: "serif",
    fontSize: { xs: 24, md: 28 },
    fontWeight: 700,
    color: "#042842",
    mb: 0.5,
  } as const;

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 12 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Explore Our Fleet & Cruise Packages"
        subtitle="Choose from luxury houseboats, traditional shikara rides, guided kayaking tours, and speedboats in Alappuzha."
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Category Filter Buttons with responsive flex wrap */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.2,
            mb: 5,
            justifyContent: { xs: "flex-start", md: "flex-start" },
          }}
        >
          <Button
            component="a"
            href="/houseboats"
            variant={selectedCategory === "all" ? "contained" : "outlined"}
            sx={{
              borderRadius: 4,
              textTransform: "none",
              px: 2.5,
              py: 0.8,
              bgcolor: selectedCategory === "all" ? "#042842" : "transparent",
              color: selectedCategory === "all" ? "#fff" : "#042842",
              borderColor: "#042842",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
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
                px: 2.5,
                py: 0.8,
                bgcolor: selectedCategory === t.slug ? "#042842" : "transparent",
                color: selectedCategory === t.slug ? "#fff" : "#042842",
                borderColor: "#042842",
                fontWeight: 600,
                fontSize: 14,
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: selectedCategory === t.slug ? "#031D30" : "rgba(4,40,66,0.05)" },
              }}
            >
              {t.name}
            </Button>
          ))}
        </Box>

        {/* Categorized Boats Row-by-Row Layout */}
        {typeDisplayOrder.map((catKey) => {
          const categoryBoats = groupedBoats[catKey];
          if (!categoryBoats || categoryBoats.length === 0) return null;

          const categoryTitle =
            typeNameMap[catKey] ||
            catKey.charAt(0).toUpperCase() + catKey.slice(1) + "s";

          return (
            <Box key={catKey} sx={{ mb: 6 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h2" sx={sectionTitle}>
                    {categoryTitle}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                    Available {categoryTitle.toLowerCase()} in Alleppey.
                  </Typography>
                </Box>
              </Stack>

              {/* Mobile horizontal scroll / Desktop 4-column grid */}
              <Box
                sx={{
                  display: { xs: "flex", md: "grid" },
                  gridTemplateColumns: { md: "repeat(4, 1fr)" },
                  gap: 2.5,
                  overflowX: { xs: "auto", md: "visible" },
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  WebkitOverflowScrolling: "touch",
                  pb: { xs: 2, md: 0 },
                  mx: { xs: -2, md: 0 },
                  px: { xs: 2, md: 0 },
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {categoryBoats.map((b) => (
                  <Box
                    key={b._id}
                    sx={{
                      minWidth: { xs: "85vw", sm: "45vw", md: "100%" },
                      width: { xs: "85vw", sm: "45vw", md: "100%" },
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <BoatCard
                      boat={b}
                      typeName={typeNameMap[b.type] || categoryTitle}
                      whatsapp={whatsapp}
                      siteName={settings.siteName}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}

        {filteredBoats.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No boats found in this category.
            </Typography>
            <Button
              component="a"
              href="/houseboats"
              variant="contained"
              sx={{ mt: 2, bgcolor: "#042842", textTransform: "none", borderRadius: 2 }}
            >
              View All Boats
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}