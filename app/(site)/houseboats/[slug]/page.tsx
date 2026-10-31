import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Button, Chip, Container, Divider, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import PhotoGrid from "@/components/PhotoGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getSettings } from "@/lib/settings";
import { telLink, waLink } from "@/lib/whatsapp";
import { cdn } from "@/lib/cdn";
import { plain } from "@/lib/serialize";
import { buildMetadata } from "@/lib/seo";
import { boatLd } from "@/lib/jsonld";
import type { BoatDTO, BoatTypeDTO } from "@/types";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

async function load(slug: string): Promise<{ boat: BoatDTO; typeName: string } | null> {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  await connectDB();
  const doc = await Boat.findOne({ slug, active: true }).lean();
  if (!doc) return null;
  const boat = plain<BoatDTO>(doc);
  const type = await BoatType.findOne({ slug: boat.type }).lean();
  return { boat, typeName: type ? plain<BoatTypeDTO>(type).name : boat.type };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const found = await load(slug);
  if (!found) return { title: "Boat not found", robots: { index: false } };
  const { boat, typeName } = found;
  const route = [boat.routeFrom, boat.routeTo].filter(Boolean).join(" to ");
  const title = boat.seoTitle || `${boat.name} | ${typeName} in Alleppey, Kerala`.slice(0, 70);
  const description =
    boat.seoDescription ||
    (boat.description ? boat.description.replace(/\s+/g, " ").slice(0, 155) : `${boat.name}: ${typeName.toLowerCase()} in Alleppey (Alappuzha), Kerala${route ? `, route ${route}` : ""}. Enquire on WhatsApp.`);
  return buildMetadata({
    title,
    description,
    path: `/houseboats/${boat.slug}`,
    image: boat.images[0] ? cdn(boat.images[0].url, 1200) : undefined,
    keywords: [`${boat.name.toLowerCase()}`, `${typeName.toLowerCase()} alleppey`, `${typeName.toLowerCase()} alappuzha`, "alleppey houseboat booking"],
  });
}

export default async function BoatDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const found = await load(slug);
  if (!found) notFound();
  const { boat, typeName } = found;
  const settings = await getSettings();
  const route = [boat.routeFrom, boat.routeStops, boat.routeTo].filter(Boolean).join(" → ");
  const wa = waLink(settings.whatsappNumber, `Hello, I would like to enquire about ${boat.name}.`);
  const facts = ([
    ["Type", typeName],
    ["Capacity", boat.capacity],
    ["Duration", boat.duration],
    ["Price", boat.price != null ? `From ₹${boat.price.toLocaleString("en-IN")}` : ""],
  ] as [string, string][]).filter(([, v]) => v);
  const alt = `${boat.name} - ${typeName.toLowerCase()} in Alleppey, Kerala`;

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <JsonLd data={boatLd(boat, typeName, settings)} />
      <Breadcrumbs items={[{ name: "Houseboats", path: "/houseboats" }, { name: boat.name, path: `/houseboats/${boat.slug}` }]} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" useFlexGap flexWrap="wrap" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Chip label={typeName} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
          <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 40 }, mt: 1 }}>{boat.name}</Typography>
        </Box>
        <Button component="a" href={wa} target="_blank" rel="noopener noreferrer" variant="contained" color="success" startIcon={<WhatsAppIcon />}>Enquire on WhatsApp</Button>
      </Stack>

      {boat.images.length > 0 && <PhotoGrid images={boat.images.map((i, n) => ({ ...i, alt: n === 0 ? alt : `${alt} - photo ${n + 1}` }))} />}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "flex-start", mt: 3 }}>
        <Box sx={{ flex: "2 1 520px", minWidth: 0 }}>
          {boat.description && (
            <>
              <Typography variant="h2" sx={{ fontSize: 26, mb: 1.5 }}>About {boat.name}</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7, whiteSpace: "pre-line", mb: 3 }}>{boat.description}</Typography>
            </>
          )}
          {facts.map(([k, v]) => (
            <Box key={k}>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ py: 1.5 }}>
                <Typography fontWeight={700} sx={{ minWidth: 110 }}>{k}</Typography>
                <Typography color="text.secondary">{v}</Typography>
              </Stack>
            </Box>
          ))}
          {(route || boat.routeImage) && (
            <>
              <Typography variant="h2" sx={{ fontSize: 26, mt: 4, mb: 1.5 }}>Backwater route</Typography>
              {boat.routeImage && (
                <Image src={boat.routeImage.url} alt={`Backwater route map of ${boat.name} in Alleppey`} width={boat.routeImage.width || 1200} height={boat.routeImage.height || 700} sizes="(max-width: 900px) 100vw, 700px" style={{ width: "100%", height: "auto", borderRadius: 16, marginBottom: 12 }} />
              )}
              {route && <Typography fontWeight={600}>{route}</Typography>}
            </>
          )}
        </Box>
        <Box sx={{ flex: "1 1 280px", position: { md: "sticky" }, top: 90, bgcolor: "#fff", border: "1px solid #E7E1D3", borderRadius: 5, p: 3 }}>
          <Typography variant="h2" sx={{ fontSize: 20, mb: 1 }}>Interested in this boat?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>Send us a message with your date and number of guests.</Typography>
          <Stack spacing={1.5}>
            <Button component="a" href={wa} target="_blank" rel="noopener noreferrer" variant="contained" color="success" startIcon={<WhatsAppIcon />}>Enquire on WhatsApp</Button>
            {(settings.callNumber || settings.whatsappNumber) && (
              <Button component="a" href={telLink(settings.callNumber || settings.whatsappNumber)} variant="outlined" startIcon={<CallIcon />}>Call us</Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
