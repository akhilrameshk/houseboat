import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TuneIcon from "@mui/icons-material/Tune";
import StarIcon from "@mui/icons-material/Star";
import RowingIcon from "@mui/icons-material/Rowing";
import SpeedIcon from "@mui/icons-material/Speed";
import SailingIcon from "@mui/icons-material/Sailing";

import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import GalleryItem from "@/models/GalleryItem";
import BoatCard from "@/components/BoatCard";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/Hero";
import HeroActions from "@/components/HeroActions";
import { getSettings } from "@/lib/settings";
import { waLink } from "@/lib/whatsapp";
import { cdn } from "@/lib/cdn";
import { plain } from "@/lib/serialize";
import { buildMetadata } from "@/lib/seo";
import { HOME_FAQS } from "@/lib/faq";
import { itemListLd } from "@/lib/jsonld";
import type { BoatDTO, BoatTypeDTO, GalleryItemDTO } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return buildMetadata({
    title: "Alleppey Mermaid Houseboats | Luxury Houseboat Tours Kerala",
    description:
      "Alleppey Mermaid Houseboats: houseboat day cruises, overnight stays, kayaking and shikara rides on the Alappuzha backwaters. AC & non-AC. Enquire on WhatsApp.",
    path: "/",
    image: s.heroImage ? cdn(s.heroImage, 1200) : "/hero.webp",
    keywords: [
      "alleppey houseboat booking",
      "luxury houseboat tours alleppey",
      "kerala backwaters houseboat",
      "alappuzha houseboat packages",
    ],
  });
}

const FEATURES: [SvgIconComponent, string][] = [
  [DirectionsBoatIcon, "Premium Houseboats"],
  [RestaurantIcon, "Delicious Kerala Cuisine"],
  [AcUnitIcon, "AC & Non-AC Options"],
  [VerifiedUserIcon, "Safe & Reliable Service"],
  [TuneIcon, "Custom Packages Available"],
];

const SERVICES = [
  { icon: DirectionsBoatIcon, name: "Houseboat", desc: "Stay overnight on the water" },
  { icon: RowingIcon, name: "Kayaking", desc: "Guided paddling trips" },
  { icon: SailingIcon, name: "Shikara", desc: "Relaxed backwater rides" },
  { icon: SpeedIcon, name: "Speedboat", desc: "Quick, fun trips" },
];

// ---- Preview data, shown only when the database has no boats / photos yet ----
const now = new Date().toISOString();
const unsplash = (id: string) => `https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`;
const IMG = {
  a: unsplash("photo-1544551763-46a013bb70d5"),
  b: unsplash("photo-1602216056096-3b40cc0c9944"),
  c: unsplash("photo-1596178065887-1198b6148b2b"),
  d: unsplash("photo-1590490360182-c33d57733427"),
};

function dummyBoat(n: number, url: string, b: Pick<BoatDTO, "name" | "slug" | "description" | "capacity" | "duration" | "price" | "routeTo" | "routeStops" | "type">): BoatDTO {
  return {
    _id: `dummy-${n}`,
    type: b.type || "houseboat",
    routeFrom: "Punnamada Jetty",
    routeImage: null,
    images: [{ 
      url, 
      publicId: `dummy-boat-${n}`, 
      width: 600, 
      height: 400, 
      alt: `${b.name} Houseboat` 
    }],
    featured: true,
    active: true,
    showInHomeGallery: true,
    sortOrder: n,
    seoTitle: `${b.name} Houseboat Alleppey`,
    seoDescription: `Book ${b.name} Houseboat in Alleppey`,
    createdAt: now,
    updatedAt: now,
    ...b,
  };
}

const DUMMY_BOATS: BoatDTO[] = [
  dummyBoat(1, IMG.a, { type: "houseboat", name: "Lake Serenity", slug: "lake-serenity", description: "Experience luxury backwater cruising with premium AC bedrooms and traditional Keralan cuisine.", capacity: "Sleeps 6 · 2 bedrooms", duration: "Overnight Stay", price: 8500, routeTo: "Kuttanad Backwaters", routeStops: "Vembanad Lake, Kuttanad Paddy Fields" }),
  dummyBoat(2, IMG.b, { type: "houseboat", name: "Golden Hour", slug: "golden-hour", description: "A cozy single-bedroom deluxe houseboat ideal for couples and honeymooners.", capacity: "Sleeps 4 · 1 bedroom", duration: "Overnight Stay", price: 6500, routeTo: "Alleppey Canal Circuit", routeStops: "Punnamada Lake, R-Block Canal" }),
  dummyBoat(3, IMG.c, { type: "shikara", name: "Palm Drift Shikara", slug: "palm-drift-shikara", description: "Spacious wooden shikara for peaceful backwater trips.", capacity: "Seating for 8", duration: "3 Hours", price: 2500, routeTo: "Vembanad Lake", routeStops: "Kavalam, Kainakary Village" }),
  dummyBoat(4, IMG.d, { type: "kayaking", name: "Lotus Paddle Kayak", slug: "lotus-paddle-kayak", description: "Guided morning paddling tour through hidden narrow streams.", capacity: "Single / Tandem", duration: "2 Hours", price: 1200, routeTo: "Kainakary Streams", routeStops: "Lotus Village" }),
  dummyBoat(5, IMG.a, { type: "speedboat", name: "Express Backwater Jet", slug: "express-backwater-jet", description: "Fast, exciting rides across Vembanad Lake.", capacity: "Up to 6 guests", duration: "1 Hour", price: 3500, routeTo: "Vembanad Circuit", routeStops: "Punnamada Lake" }),
  dummyBoat(6, IMG.b, { type: "houseboat", name: "Royal Suite Cruiser", slug: "royal-suite-cruiser", description: "Ultra-luxury houseboat with full glass walls and upper deck lounge.", capacity: "Sleeps 8 · 3 bedrooms", duration: "Overnight Stay", price: 15000, routeTo: "Pathiramanal Island", routeStops: "Kumarakom Route" }),
];

const dummyGallery = (n: number, url: string, caption: string): GalleryItemDTO => ({
  _id: `g${n}`,
  url,
  publicId: `dummy-gallery-${n}`,
  width: 600,
  height: 400,
  boat: null,
  caption,
  showOnHome: true,
  sortOrder: n,
  createdAt: now,
  updatedAt: now,
});

const DUMMY_GALLERY: GalleryItemDTO[] = [
  dummyGallery(1, IMG.b, "Houseboat cruise"),
  dummyGallery(2, IMG.a, "Kerala backwaters"),
  dummyGallery(3, IMG.c, "Sunset stay"),
  dummyGallery(4, IMG.d, "Bedroom suite"),
];

export default async function HomePage() {
  const settings = await getSettings();

  let types: BoatTypeDTO[] = [];
  let boats: BoatDTO[] = [];
  let gallery: GalleryItemDTO[] = [];

  try {
    await connectDB();
    const [fetchedTypes, fetchedBoats, fetchedGallery] = await Promise.all([
      BoatType.find().sort({ name: 1 }).lean().then((r) => plain<BoatTypeDTO[]>(r)),
      Boat.find({ active: true }).sort({ featured: -1, sortOrder: 1, createdAt: -1 }).limit(12).lean().then((r) => plain<BoatDTO[]>(r)),
      GalleryItem.find({ showOnHome: true }).sort({ createdAt: -1 }).limit(12).lean().then((r) => plain<GalleryItemDTO[]>(r)),
    ]);
    types = fetchedTypes;
    boats = fetchedBoats;
    gallery = fetchedGallery;
  } catch (error) {
    console.warn("Database fetch skipped or empty, rendering typed dummy data.", error);
  }

  const activeBoats = boats.length > 0 ? boats : DUMMY_BOATS;
  const activeGallery = gallery.length > 0 ? gallery : DUMMY_GALLERY;

  const typeName = Object.fromEntries(types.map((t) => [t.slug, t.name]));
  const whatsapp = settings.whatsappNumber || "919000000000";
  const wa = waLink(whatsapp, "Hello, I would like to make an enquiry.");

  const sectionTitle = { fontFamily: "serif", fontSize: 32, fontWeight: 700, color: "#042842", mb: 0.5 } as const;
  const outlineBtn = {
    borderColor: "#D0D0D0",
    color: "#2B3A42",
    textTransform: "none",
    borderRadius: 2,
    px: 2,
    "&:hover": { borderColor: "#006C9C", bgcolor: "transparent" },
  } as const;

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42" }}>
      {/* Structured data only for real boats, never for preview data */}
      {boats.length > 0 && <JsonLd data={itemListLd(boats)} />}

      {/* Common hero */}
      <Hero
        size="large"
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Luxury Houseboat Tours in Alleppey"
        subtitle="Sail through serene backwaters, lush green paddy fields and traditional villages. Experience the real Kerala sunset."
      >
        <HeroActions waLink={wa} />
      </Hero>

      {/* Feature Strip */}
      <Box sx={{ bgcolor: "#F8F9FA", py: 3, borderBottom: "1px solid #EAEAEA" }}>
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            {FEATURES.map(([Icon, label]) => (
              <Stack key={label} direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                <Icon sx={{ color: "#006C9C", fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#2B3A42" }}>
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" component="section" sx={{ pt: 8, pb: 4 }}>
        <Typography variant="h2" sx={sectionTitle}>
          Our services
        </Typography>
        <Typography sx={{ mb: 4, fontSize: 15, color: "text.secondary" }}>Choose what you would like to do.</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }, gap: 3 }}>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Box
                key={s.name}
                component="a"
                href={`/houseboats?type=${s.name.toLowerCase()}`}
                sx={{
                  p: 3,
                  bgcolor: "#fff",
                  border: "1px solid #EAEAEA",
                  borderRadius: 3,
                  color: "text.primary",
                  textDecoration: "none",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { borderColor: "#006C9C", transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
                }}
              >
                <Icon sx={{ color: "#006C9C", fontSize: 28, mb: 1.5 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: 18, color: "#042842" }}>
                  {s.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, fontSize: 13, color: "text.secondary" }}>
                  {s.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Popular Boats Section */}
      <Container maxWidth="lg" component="section" sx={{ pt: 6, pb: 4 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-end", mb: 1 }}>
          <Box>
            <Typography variant="h2" sx={sectionTitle}>
              Popular boats
            </Typography>
            <Typography sx={{ fontSize: 15, color: "text.secondary" }}>Swipe to see more.</Typography>
          </Box>
          <Link href="/houseboats" style={{ textDecoration: "none" }}>
            <Button variant="outlined" size="small" sx={outlineBtn}>
              View all →
            </Button>
          </Link>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 3.5, mt: 2, overflowX: "auto" }}>
          <Chip label="All" component="a" href="/houseboats" clickable color="primary" sx={{ bgcolor: "#042842", fontWeight: 600 }} />
          {["Houseboat", "Kayaking", "Shikara", "Speedboat"].map((t) => (
            <Chip
              key={t}
              label={t}
              component="a"
              href={`/houseboats?type=${t.toLowerCase()}`}
              clickable
              variant="outlined"
              sx={{ borderColor: "#E0E0E0", color: "#555", fontWeight: 500, "&:hover": { bgcolor: "#fff" } }}
            />
          ))}
        </Stack>

        {/* Desktop 6-card row | Mobile 1 + 1/4 card peek touch swipe (up to 4 items) */}
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "repeat(6, 1fr)" },
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
          {activeBoats.slice(0, 6).map((b, index) => (
            <Box
              key={b._id}
              sx={{
                minWidth: { xs: "78vw", sm: "45vw", md: "15vw", },
                width: { xs: "78vw", sm: "45vw", md:"15vw", },
                flexShrink: 0,
                scrollSnapAlign: "start",
                display: { xs: index >= 4 ? "none" : "block", md: "block" },
              }}
            >
              <BoatCard boat={b} typeName={typeName[b.type] || "Houseboat"} whatsapp={whatsapp} />
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Link href="/houseboats" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#006C9C", textTransform: "none", px: 4, py: 1.2, borderRadius: 2, fontWeight: 600, "&:hover": { bgcolor: "#00557A" } }}
            >
              View all boats
            </Button>
          </Link>
        </Box>
      </Container>

      {/* Gallery Section */}
      <Container maxWidth="lg" component="section" sx={{ pt: 6, pb: 4 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-end", mb: 2.5 }}>
          <Box>
            <Typography variant="h2" sx={sectionTitle}>
              Gallery
            </Typography>
            <Typography sx={{ fontSize: 15, color: "text.secondary" }}>Moments from our trips.</Typography>
          </Box>
          <Button component="a" href="/gallery" variant="outlined" size="small" sx={outlineBtn}>
            View gallery →
          </Button>
        </Stack>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, "&::-webkit-scrollbar": { display: "none" } }}>
          {activeGallery.map((g) => (
            <Box key={g._id} sx={{ position: "relative", width: 240, height: 170, flexShrink: 0, borderRadius: 3, overflow: "hidden" }}>
              <Image src={g.url} alt={g.caption || "Alleppey houseboat photo"} fill sizes="240px" loading="lazy" style={{ objectFit: "cover" }} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* Google Review Section */}
      <Container maxWidth="lg" component="section" sx={{ pt: 6, pb: 4 }}>
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid #EAEAEA",
            borderRadius: 4,
            p: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <Box>
            <Stack direction="row" spacing={0.5} sx={{ color: "#FBBF24", mb: 1 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} sx={{ fontSize: 20 }} />
              ))}
            </Stack>
            <Typography variant="h2" sx={{ fontFamily: "serif", fontSize: 26, fontWeight: 700, color: "#042842", mb: 0.5 }}>
              Enjoyed your trip? Leave us a Google review
            </Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Your review helps other travellers find us.</Typography>
          </Box>
          <Button
            component="a"
            href={settings.googleReviewUrl || "https://google.com"}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{ bgcolor: "#042842", color: "#fff", textTransform: "none", px: 3, py: 1, borderRadius: 2, fontWeight: 600, "&:hover": { bgcolor: "#021A2D" } }}
          >
            Review us on Google
          </Button>
        </Box>
      </Container>

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <FaqSection faqs={HOME_FAQS} title="Alleppey houseboat FAQs" />
      </Container>

      {/* Enquiry Banner */}
      <Container maxWidth="lg" component="section" sx={{ pt: 4, pb: 8 }}>
        <Box
          sx={{
            bgcolor: "#04385B",
            borderRadius: 4,
            p: { xs: 4, md: 5 },
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
            alignItems: "center",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ fontFamily: "serif", fontSize: 28, fontWeight: 700, mb: 1 }}>
              Planning your Alleppey trip?
            </Typography>
            <Typography sx={{ color: "#D0E4EF", fontSize: 15 }}>Message us your dates and group size. We will reply on WhatsApp.</Typography>
          </Box>
          <Button
            component="a"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            className="tempting-whatsapp"
            startIcon={<WhatsAppIcon />}
            sx={{ bgcolor: "#00A859", textTransform: "none", px: 3.5, py: 1.2, borderRadius: 2, fontWeight: 600, "&:hover": { bgcolor: "#008F4C" } }}
          >
            Chat on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  );
}