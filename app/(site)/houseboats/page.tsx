import type { Metadata } from "next";
import Link from "next/link";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import BoatCard from "@/components/BoatCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getSettings } from "@/lib/settings";
import { plain } from "@/lib/serialize";
import { buildMetadata } from "@/lib/seo";
import { itemListLd } from "@/lib/jsonld";
import type { BoatDTO, BoatTypeDTO } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Alleppey Houseboats, Kayaking & Shikara Boats | Kerala",
  description: "Browse Alleppey houseboats, kayaking and shikara boat rides on the Kerala backwaters. See routes and photos, then enquire on WhatsApp.",
  path: "/houseboats",
  keywords: ["alleppey houseboats", "alleppey boat house", "houseboat list alappuzha", "alleppey shikara", "alleppey kayaking"],
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function BoatsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const raw = sp.type;
  const typeSlug = typeof raw === "string" && /^[a-z0-9-]{1,60}$/.test(raw) ? raw : "";
  const settings = await getSettings();
  await connectDB();
  const [types, boats] = await Promise.all([
    BoatType.find().sort({ name: 1 }).lean().then((r) => plain<BoatTypeDTO[]>(r)),
    Boat.find(typeSlug ? { active: true, type: typeSlug } : { active: true }).sort({ sortOrder: 1, createdAt: -1 }).lean().then((r) => plain<BoatDTO[]>(r)),
  ]);
  const typeName = Object.fromEntries(types.map((t) => [t.slug, t.name]));
  const current = types.find((t) => t.slug === typeSlug);

  return (
    <>
      {boats.length > 0 && <JsonLd data={itemListLd(boats)} />}
      <Box sx={{ background: "linear-gradient(135deg,#04385B,#0A5C85)", color: "#fff", py: 6 }}>
        <Container maxWidth="lg"  sx={{
          mt:10,}}>
          <Breadcrumbs light items={[{ name: "Houseboats", path: "/houseboats" }]} />
          <Typography variant="h1" sx={{ fontSize: 40, mb: 1 }}>{current ? `${current.name} in Alleppey` : "Our Houseboats in Alleppey"}</Typography>
          <Typography sx={{ color: "#CFE3EA" }}>Houseboats, kayaks and shikaras on the Kerala backwaters. Filter by type and enquire on WhatsApp.</Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: "auto", pb: 1 }}>
          <Chip label="All" component="a" href="/houseboats" clickable color={typeSlug ? "default" : "primary"} variant={typeSlug ? "outlined" : "filled"} />
          {types.map((t) => (
            <Chip key={t._id} label={t.name} component="a" href={`/houseboats?type=${t.slug}`} clickable color={typeSlug === t.slug ? "primary" : "default"} variant={typeSlug === t.slug ? "filled" : "outlined"} />
          ))}
        </Stack>
        {boats.length === 0 ? (
          <Typography color="text.secondary">No boats found.</Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", lg: "repeat(4,1fr)" }, gap: 3 }}>
            {boats.map((b) => <BoatCard key={b._id} boat={b} typeName={typeName[b.type]} whatsapp={settings.whatsappNumber} />)}
          </Box>
        )}
      </Container>
    </>
  );
}