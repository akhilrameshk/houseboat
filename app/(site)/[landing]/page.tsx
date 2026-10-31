import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import BoatCard from "@/components/BoatCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { getSettings } from "@/lib/settings";
import { waLink } from "@/lib/whatsapp";
import { plain } from "@/lib/serialize";
import { buildMetadata } from "@/lib/seo";
import { SEO_PAGES, SEO_PAGE_MAP } from "@/lib/seo-pages";
import type { BoatDTO, BoatTypeDTO } from "@/types";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

type Params = Promise<{ landing: string }>;

export function generateStaticParams(): { landing: string }[] {
  return SEO_PAGES.map((p) => ({ landing: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { landing } = await params;
  const page = SEO_PAGE_MAP[landing];
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: `/${page.slug}`, keywords: page.keywords });
}

export default async function LandingPage({ params }: { params: Params }) {
  const { landing } = await params;
  const page = SEO_PAGE_MAP[landing];
  if (!page) notFound();

  const settings = await getSettings();
  let boats: BoatDTO[] = [];
  let typeName: Record<string, string> = {};
  try {
    await connectDB();
    const [types, found] = await Promise.all([
      BoatType.find().lean().then((r) => plain<BoatTypeDTO[]>(r)),
      page.boatType
        ? Boat.find({ active: true, type: page.boatType }).sort({ featured: -1, sortOrder: 1 }).limit(4).lean().then((r) => plain<BoatDTO[]>(r))
        : Promise.resolve<BoatDTO[]>([]),
    ]);
    boats = found;
    typeName = Object.fromEntries(types.map((t) => [t.slug, t.name]));
  } catch {
    boats = [];
  }
  const wa = waLink(settings.whatsappNumber, `Hello, I would like to enquire about: ${page.h1}.`);
  const others = SEO_PAGES.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Box sx={{ background: "linear-gradient(135deg,#04385B,#0A5C85)", color: "#fff", py: 7 }}>
        <Container maxWidth="lg">
          <Breadcrumbs light items={[{ name: page.h1, path: `/${page.slug}` }]} />
          <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 44 }, mb: 2, maxWidth: 820 }}>{page.h1}</Typography>
          <Typography sx={{ color: "#CFE3EA", maxWidth: 760, lineHeight: 1.7, mb: 3 }}>{page.intro}</Typography>
          <Button component="a" href={wa} target="_blank" rel="noopener noreferrer" variant="contained" color="success" size="large" startIcon={<WhatsAppIcon />}>{page.cta}</Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "flex-start" }}>
          <Box sx={{ flex: "2 1 520px", minWidth: 0 }}>
            {page.sections.map((s) => (
              <Box component="section" key={s.h} sx={{ mb: 4 }}>
                <Typography variant="h2" sx={{ fontSize: 28, mb: 1.5 }}>{s.h}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{s.p}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: "1 1 280px", bgcolor: "#fff", border: "1px solid #E7E1D3", borderRadius: 5, p: 3 }}>
            <Typography variant="h2" sx={{ fontSize: 20, mb: 1.5 }}>Highlights</Typography>
            <Stack spacing={1.2}>
              {page.points.map((pt) => (
                <Stack key={pt} direction="row" spacing={1} alignItems="flex-start">
                  <CheckCircleIcon color="success" fontSize="small" sx={{ mt: 0.3 }} />
                  <Typography variant="body2">{pt}</Typography>
                </Stack>
              ))}
            </Stack>
            <Button fullWidth component="a" href={wa} target="_blank" rel="noopener noreferrer" variant="contained" color="success" startIcon={<WhatsAppIcon />} sx={{ mt: 2.5 }}>Enquire on WhatsApp</Button>
          </Box>
        </Box>

        {boats.length > 0 && (
          <Box component="section" sx={{ mt: 4 }}>
            <Typography variant="h2" sx={{ fontSize: 28, mb: 2.5 }}>Boats for this experience</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }, gap: 3 }}>
              {boats.map((b) => <BoatCard key={b._id} boat={b} typeName={typeName[b.type]} whatsapp={settings.whatsappNumber} />)}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 7, maxWidth: 860 }}>
          <FaqSection faqs={page.faqs} />
        </Box>

        <Box component="section" sx={{ mt: 7 }}>
          <Typography variant="h2" sx={{ fontSize: 24, mb: 2 }}>More Alleppey houseboat experiences</Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1.2} sx={{ "& > *": { mb: 1.2 } }}>
            {others.map((o) => <Chip key={o.slug} label={o.h1} component={Link} href={`/${o.slug}`} clickable variant="outlined" />)}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
