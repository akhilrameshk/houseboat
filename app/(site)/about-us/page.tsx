import type { Metadata } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import VerifiedIcon from "@mui/icons-material/Verified";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Hero from "@/components/Hero";
import { getSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "About Alleppey Mermaid Houseboats | Houseboat Tours Alappuzha",
  description:
    "About Alleppey Mermaid Houseboats: houseboat cruises, kayaking and shikara rides on the Alleppey backwaters in Kerala. Discover, relax, reconnect.",
  path: "/about-us",
  keywords: [
    "alleppey houseboat company",
    "about alleppey mermaid houseboats",
    "alappuzha houseboat operator",
  ],
});

const HIGHLIGHTS = [
  {
    icon: DirectionsBoatIcon,
    title: "Luxury & Comfort",
    desc: "Handpicked premium houseboats with air-conditioned luxury bedrooms and scenic upper decks.",
  },
  {
    icon: RestaurantIcon,
    title: "Authentic Kerala Cuisine",
    desc: "Freshly prepared Karimeen fry, traditional Kerala duck roast, and coconut-infused curries onboard.",
  },
  {
    icon: VerifiedIcon,
    title: "Safety & Reliability",
    desc: "Fully certified vessels with safety equipment and experienced local captains navigating backwater routes.",
  },
  {
    icon: SupportAgentIcon,
    title: "Tailored Experience",
    desc: "Honeymoon specials, family holidays, and private day cruises designed around your schedule.",
  },
];

const STEPS: [string, string, string][] = [
  [
    "01",
    "Explore Our Fleet",
    "Browse our range of deluxe & luxury houseboats, shikaras, and kayaks with verified photos and routes.",
  ],
  [
    "02",
    "Instant WhatsApp Booking",
    "Message us your travel dates, group size, and meal preferences. We reply instantly with live availability.",
  ],
  [
    "03",
    "Sail Through Paradise",
    "Board at Punnamada Jetty, sip fresh coconut water, and glide through Kerala's tranquil backwaters.",
  ],
];

export default async function AboutPage() {
  const settings = await getSettings();
  const wa = waLink(
    settings?.whatsappNumber || "919000000000",
    "Hello, I would like to learn more about your houseboats."
  );

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 10 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Discover. Relax. Reconnect."
        subtitle="Your trusted gateway to pristine backwaters, authentic Keralan hospitality, and unforgettable houseboat cruises in Alleppey."
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Brand Story Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
            gap: 5,
            alignItems: "center",
            mb: 8,
          }}
        >
          <Box>
            <Typography
              component="p"
              sx={{
                color: "#006C9C",
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontSize: 13,
                mb: 1,
              }}
            >
              Our Story
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "serif",
                fontSize: { xs: 28, md: 38 },
                fontWeight: 700,
                color: "#042842",
                mb: 2.5,
                lineHeight: 1.2,
              }}
            >
              Crafting Memorable Journeys on Alleppey's Emerald Waters
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ lineHeight: 1.8, fontSize: 16, mb: 2 }}
            >
              Welcome to <strong>{settings?.siteName || "Alleppey Mermaid Houseboats"}</strong>, where backwater dreams come alive. Nestled in the heart of Alappuzha—the Venice of the East—we specialize in handcrafted houseboat cruises, shikara rides, and kayak tours across serene canals and Lake Vembanad.
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ lineHeight: 1.8, fontSize: 16, mb: 3 }}
            >
              Whether you are seeking a romantic honeymoon stay under starlit skies, a family getaway with traditional Kerala dining, or a peaceful day trip through palm-fringed channels, our dedicated crew ensures absolute comfort, safety, and authentic local charm.
            </Typography>
            <Button
              component="a"
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              sx={{
                bgcolor: "#00A859",
                textTransform: "none",
                px: 3.5,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 15,
                "&:hover": { bgcolor: "#008F4C" },
              }}
            >
              Plan Your Trip on WhatsApp
            </Button>
          </Box>

          {/* Quick Highlight Stats Card */}
          <Box
            sx={{
              bgcolor: "#04385B",
              color: "#fff",
              borderRadius: 4,
              p: 4,
              boxShadow: "0 16px 32px rgba(4,56,91,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "serif",
                fontSize: 24,
                fontWeight: 700,
                color: "#FDE7B0",
              }}
            >
              Why Travel With Us?
            </Typography>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h4" fontWeight={800} fontSize={28} color="#fff">
                  100% Verified
                </Typography>
                <Typography variant="body2" sx={{ color: "#CFE3EA" }}>
                  Inspected boats with air conditioning & clean amenities.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={800} fontSize={28} color="#fff">
                  Custom Routes
                </Typography>
                <Typography variant="body2" sx={{ color: "#CFE3EA" }}>
                  Covering Kuttanad paddy fields, Kainakary & Vembanad Lake.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={800} fontSize={28} color="#fff">
                  Local Chefs
                </Typography>
                <Typography variant="body2" sx={{ color: "#CFE3EA" }}>
                  Enjoy home-style Kerala seafood and vegetarian feasts.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Feature Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "serif",
              fontSize: { xs: 26, md: 34 },
              fontWeight: 700,
              color: "#042842",
              textAlign: "center",
              mb: 1,
            }}
          >
            What Makes Our Cruises Special
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 4,
              maxWidth: 540,
              mx: "auto",
              fontSize: 15,
            }}
          >
            Every detail is arranged so you can sit back and embrace the tranquil beauty of Kerala.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(4,1fr)",
              },
              gap: 3,
            }}
          >
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <Stack
                  key={item.title}
                  sx={{
                    bgcolor: "#fff",
                    border: "1px solid #EAEAEA",
                    borderRadius: 3,
                    p: 3,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#006C9C",
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    },
                  }}
                >
                  <Icon sx={{ color: "#006C9C", fontSize: 32, mb: 1.5 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#042842",
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6, fontSize: 13.5 }}
                  >
                    {item.desc}
                  </Typography>
                </Stack>
              );
            })}
          </Box>
        </Box>

        {/* How It Works Section */}
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid #EAEAEA",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "serif",
              fontSize: { xs: 26, md: 34 },
              fontWeight: 700,
              color: "#042842",
              textAlign: "center",
              mb: 1,
            }}
          >
            How It Works
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 5,
              maxWidth: 500,
              mx: "auto",
              fontSize: 15,
            }}
          >
            Booking your backwater getaway in 3 seamless steps.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
              gap: 3,
            }}
          >
            {STEPS.map(([n, t, d]) => (
              <Stack
                key={n}
                sx={{
                  bgcolor: "#F8F9FA",
                  border: "1px solid #EAEAEA",
                  borderRadius: 3,
                  p: 3.5,
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "serif",
                    fontWeight: 800,
                    fontSize: 32,
                    color: "#006C9C",
                    lineHeight: 1,
                    mb: 1.5,
                  }}
                >
                  {n}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#042842",
                    mb: 1,
                  }}
                >
                  {t}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6, fontSize: 14 }}
                >
                  {d}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}