import type { Metadata } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TuneIcon from "@mui/icons-material/Tune";
import StarIcon from "@mui/icons-material/Star";

import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import GalleryItem from "@/models/GalleryItem";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/Hero";
import HeroActions from "@/components/HeroActions";
import AutoRotatingBoatLists from "@/components/AutoRotatingBoatLists";
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

// ---- Preview data ----
const now = new Date().toISOString();
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`;
const IMG = {
  a: unsplash("photo-1544551763-46a013bb70d5"),
  b: unsplash("photo-1602216056096-3b40cc0c9944"),
  c: unsplash("photo-1596178065887-1198b6148b2b"),
  d: unsplash("photo-1590490360182-c33d57733427"),
};

function dummyBoat(
  n: number,
  url: string,
  b: Pick<
    BoatDTO,
    | "name"
    | "slug"
    | "description"
    | "capacity"
    | "duration"
    | "price"
    | "routeTo"
    | "routeStops"
    | "type"
  >
): BoatDTO {
  return {
    _id: `dummy-${n}`,
    routeFrom: "Punnamada Jetty",
    routeImage: null,
    images: [
      {
        url,
        publicId: `dummy-boat-${n}`,
        width: 600,
        height: 400,
        alt: `${b.name} Houseboat`,
      },
    ],
    featured: true,
    active: true,
    showInHomeGallery: true,
    sortOrder: n,
    seoTitle: `${b.name} Houseboat Alleppey`,
    seoDescription: `Book ${b.name} Houseboat in Alleppey`,
    createdAt: now,
    updatedAt: now,
    ...b,
    type: b.type || "houseboat",
  };
}

const DUMMY_BOATS: BoatDTO[] = [
  dummyBoat(1, IMG.a, {
    type: "houseboat",
    name: "Lake Serenity",
    slug: "lake-serenity",
    description:
      "Experience luxury backwater cruising with premium AC bedrooms and traditional Keralan cuisine.",
    capacity: "Sleeps 6 · 2 bedrooms",
    duration: "Overnight Stay",
    price: 8500,
    routeTo: "Kuttanad Backwaters",
    routeStops: "Vembanad Lake, Kuttanad Paddy Fields",
  }),
  dummyBoat(2, IMG.b, {
    type: "houseboat",
    name: "Golden Hour",
    slug: "golden-hour",
    description:
      "A cozy single-bedroom deluxe houseboat ideal for couples and honeymooners.",
    capacity: "Sleeps 4 · 1 bedroom",
    duration: "Overnight Stay",
    price: 6500,
    routeTo: "Alleppey Canal Circuit",
    routeStops: "Punnamada Lake, R-Block Canal",
  }),
  dummyBoat(3, IMG.a, {
    type: "houseboat",
    name: "Royal Suite Cruiser",
    slug: "royal-suite-cruiser",
    description:
      "Ultra-luxury houseboat with full glass walls and upper deck lounge.",
    capacity: "Sleeps 8 · 3 bedrooms",
    duration: "Overnight Stay",
    price: 15000,
    routeTo: "Pathiramanal Island",
    routeStops: "Kumarakom Route",
  }),
  dummyBoat(4, IMG.d, {
    type: "kayaking",
    name: "Lotus Paddle Kayak",
    slug: "lotus-paddle-kayak",
    description:
      "Guided morning paddling tour through hidden narrow streams.",
    capacity: "Single / Tandem",
    duration: "2 Hours",
    price: 1200,
    routeTo: "Kainakary Streams",
    routeStops: "Lotus Village",
  }),
  dummyBoat(5, IMG.c, {
    type: "shikara",
    name: "Palm Drift Shikara",
    slug: "palm-drift-shikara",
    description: "Spacious wooden shikara for peaceful backwater trips.",
    capacity: "Seating for 8",
    duration: "3 Hours",
    price: 2500,
    routeTo: "Vembanad Lake",
    routeStops: "Kavalam, Kainakary Village",
  }),
  dummyBoat(6, IMG.a, {
    type: "speedboat",
    name: "Express Backwater Jet",
    slug: "express-backwater-jet",
    description: "Fast, exciting rides across Vembanad Lake.",
    capacity: "Up to 6 guests",
    duration: "1 Hour",
    price: 3500,
    routeTo: "Vembanad Circuit",
    routeStops: "Punnamada Lake",
  }),
];

const dummyGallery = (
  n: number,
  url: string,
  caption: string
): GalleryItemDTO => ({
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
      Boat.find({ active: true })
        .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
        .limit(24)
        .lean()
        .then((r) => plain<BoatDTO[]>(r)),
      GalleryItem.find({ showOnHome: true })
        .sort({ createdAt: -1 })
        .limit(12)
        .lean()
        .then((r) => plain<GalleryItemDTO[]>(r)),
    ]);
    types = fetchedTypes;
    boats = fetchedBoats;
    gallery = fetchedGallery;
  } catch (error) {
    console.warn("Database fetch skipped or empty, rendering typed dummy data.", error);
  }

  const activeBoats = boats.length > 0 ? boats : DUMMY_BOATS;
  const activeGallery = gallery.length > 0 ? gallery : DUMMY_GALLERY;

  const typeNameMap = Object.fromEntries(types.map((t) => [t.slug, t.name]));
  const whatsapp = settings.whatsappNumber || "919000000000";
  const wa = waLink(whatsapp, "Hello, I would like to make an enquiry.");

  // Group boats dynamically by type
  const groupedBoats = activeBoats.reduce<Record<string, BoatDTO[]>>(
    (acc, boat) => {
      const boatType = boat.type?.toLowerCase() || "house-boat";
      if (!acc[boatType]) acc[boatType] = [];
      acc[boatType].push(boat);
      return acc;
    },
    {}
  );

  // Set category order: 1st Houseboats, 2nd Kayaking, then remaining categories
  const priorityOrder = ["houseboat", "kayaking", "shikara", "speedboat"];
  const allAvailableTypes = Object.keys(groupedBoats);
  const typeDisplayOrder = Array.from(
    new Set([...priorityOrder, ...allAvailableTypes])
  );

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42" }}>
      {/* Structured data */}
      {boats.length > 0 && <JsonLd data={itemListLd(boats)} />}

      {/* Hero */}
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
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {FEATURES.map(([Icon, label]) => (
              <Stack
                key={label}
                direction="row"
                spacing={1.2}
                sx={{ alignItems: "center" }}
              >
                <Icon sx={{ color: "#006C9C", fontSize: 20 }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#2B3A42" }}
                >
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Auto-Rotating Boat Lists (1st Houseboats, 2nd Kayaking, then others) & Gallery */}
      <AutoRotatingBoatLists
        groupedBoats={groupedBoats}
        typeDisplayOrder={typeDisplayOrder}
        typeNameMap={typeNameMap}
        whatsapp={whatsapp}
        activeGallery={activeGallery}
      />

      {/* Google Review Section */}
      <Container maxWidth="lg" component="section" sx={{ pt: 4, pb: 4 }}>
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
            <Typography
              variant="h2"
              sx={{
                fontFamily: "serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#042842",
                mb: 0.5,
              }}
            >
              Enjoyed your trip? Leave us a Google review
            </Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
              Your review helps other travellers find us.
            </Typography>
          </Box>
          <Button
            component="a"
            href={settings.googleReviewUrl || "https://google.com"}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              bgcolor: "#042842",
              color: "#fff",
              textTransform: "none",
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": { bgcolor: "#021A2D" },
            }}
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
            <Typography
              variant="h2"
              sx={{ fontFamily: "serif", fontSize: 28, fontWeight: 700, mb: 1 }}
            >
              Planning your Alleppey trip?
            </Typography>
            <Typography sx={{ color: "#D0E4EF", fontSize: 15 }}>
              Message us your dates and group size. We will reply on WhatsApp.
            </Typography>
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
            sx={{
              bgcolor: "#00A859",
              textTransform: "none",
              px: 3.5,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": { bgcolor: "#008F4C" },
            }}
          >
            Chat on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  );
}