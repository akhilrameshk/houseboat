import type { Metadata } from "next";
import { Box, Container, Typography, Breadcrumbs as MuiBreadcrumbs, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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

  const typeNameMap:any = Object.fromEntries(types.map((t) => [t.slug, t.name]));
  const whatsapp = settings.whatsappNumber || "919000000000";

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 10 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Explore Our Fleet & Cruise Packages"
        subtitle="Choose from luxury houseboats, traditional shikara rides, guided kayaking tours, and speedboats in Alappuzha."
         />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Category Description & Filterable Grid Component */}
         <BoatCard
                        boat={boats[0]}
                        typeName={typeNameMap || "Boat"}
                        whatsapp={whatsapp}
                      />
       
      </Container>
    </Box>
  );
}