import type { Metadata } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import RowingIcon from "@mui/icons-material/Rowing";
import SailingIcon from "@mui/icons-material/Sailing";
import SpeedIcon from "@mui/icons-material/Speed";
import Hero from "@/components/Hero";
import { SEO_PAGES } from "@/lib/seo-pages";
import { getSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Backwater Cruise Services & Packages in Alleppey | Kerala",
  description:
    "Explore luxury houseboats, day cruises, overnight stays, kayaking and shikara boat rides in Alleppey backwaters. Enquire on WhatsApp for best rates.",
  path: "/services",
  keywords: [
    "alleppey houseboat packages",
    "luxury houseboat in alleppey",
    "alleppey houseboat day cruise",
    "overnight houseboat stay in alleppey",
    "alleppey honeymoon houseboat",
    "family houseboat alleppey",
    "kayaking in alleppey backwaters",
    "shikara boat ride in alleppey",
  ],
});

const MAIN_SERVICES = [
  {
    icon: DirectionsBoatIcon,
    name: "Houseboat Cruises & Stay",
    badge: "Most Popular",
    desc: "Overnight stays and premium day cruises with air-conditioned luxury bedrooms, upper lounge decks, and freshly prepared Keralan meals onboard.",
    features: ["AC & Non-AC Luxury Options", "Authentic Keralan Meals Included", "Kuttanad Paddy Fields & Vembanad Lake Routes"],
    link: "/houseboats?type=houseboat",
  },
  {
    icon: SailingIcon,
    name: "Shikara Boat Rides",
    badge: "Relaxed Village Tour",
    desc: "Open-air wooden boats designed for shallow and narrow village canals where houseboats cannot enter. Perfect for morning and sunset views.",
    features: ["Seating for 2 to 15 passengers", "Narrow canal & village coverage", "Flexible hourly rates"],
    link: "/houseboats?type=shikara",
  },
  {
    icon: RowingIcon,
    name: "Kayaking Expeditions",
    badge: "Adventure & Nature",
    desc: "Paddle through tranquil, hidden backwater streams surrounded by coconut groves and lotus blooms with certified local guides.",
    features: ["Single & Tandem Kayaks", "Guide & Life Jackets Included", "Early Morning & Sunset Slotted Trips"],
    link: "/houseboats?type=kayaking",
  },
  {
    icon: SpeedIcon,
    name: "Speedboat Rides",
    badge: "Express Lake Tour",
    desc: "Fast, exciting rides across Vembanad Lake. Ideal for travellers looking for a quick and fun backwater excursion.",
    features: ["Quick transfers & lake circuits", "Safety equipment provided", "Custom duration options"],
    link: "/houseboats?type=speedboat",
  },
];

export default async function ServicesPage() {
  const settings = await getSettings();

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 10 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Alleppey Backwater Services & Packages"
        subtitle="Choose from luxury houseboat stays, day cruises, guided kayaking tours, and traditional shikara rides across Alappuzha."
      />

      {/* Main Core Services Grid */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "serif",
            fontSize: { xs: 26, md: 34 },
            fontWeight: 700,
            color: "#042842",
            mb: 1,
          }}
        >
          Our Core Cruise Experiences
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: 15 }}>
          Select a category to view boats or enquire directly on WhatsApp.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
            gap: 4,
            mb: 8,
          }}
        >
          {MAIN_SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Stack
                key={s.name}
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #EAEAEA",
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "#006C9C",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        bgcolor: "#EEF6FA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color: "#006C9C", fontSize: 30 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        bgcolor: "#042842",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                      }}
                    >
                      {s.badge}
                    </Typography>
                  </Stack>

                  <Typography variant="h3" sx={{ fontFamily: "serif", fontSize: 24, fontWeight: 700, color: "#042842", mb: 1 }}>
                    {s.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.7, mb: 2.5 }}>
                    {s.desc}
                  </Typography>

                  <Stack spacing={1} sx={{ mb: 3 }}>
                    {s.features.map((f) => (
                      <Typography key={f} variant="body2" sx={{ color: "#2B3A42", fontWeight: 500, display: "flex", alignItems: "center", gap: 1 }}>
                        <span style={{ color: "#006C9C", fontWeight: "bold" }}>✓</span> {f}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    component="a"
                    href={s.link}
                    variant="outlined"
                    sx={{
                      borderColor: "#006C9C",
                      color: "#006C9C",
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                      flex: 1,
                      "&:hover": { bgcolor: "#EEF6FA", borderColor: "#006C9C" },
                    }}
                  >
                    View Boats →
                  </Button>
                  <Button
                    component="a"
                    href={waLink(
                      settings?.whatsappNumber || "919000000000",
                      `Hello, I am interested in booking a ${s.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      bgcolor: "#00A859",
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                      flex: 1,
                      "&:hover": { bgcolor: "#008F4C" },
                    }}
                  >
                    Enquire
                  </Button>
                </Stack>
              </Stack>
            );
          })}
        </Box>

        {/* Footer Keywords Section */}
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid #EAEAEA",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "serif",
              fontSize: { xs: 24, md: 30 },
              fontWeight: 700,
              color: "#042842",
              mb: 1,
            }}
          >
            All Alleppey Backwater Services & Packages
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, fontSize: 14.5 }}>
            We offer specialized tours designed for couples, families, and private groups:
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {SEO_PAGES.map((page) => (
              <Stack
                key={page.slug}
                sx={{
                  bgcolor: "#F8F9FA",
                  border: "1px solid #EAEAEA",
                  borderRadius: 2.5,
                  p: 2.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#006C9C",
                    bgcolor: "#EEF6FA",
                  },
                }}
              >
                <Typography fontWeight={700} fontSize={15} color="#042842" sx={{ mb: 0.5 }}>
                  {page.h1}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 1.5 }}>
                  Customizable options available for this package.
                </Typography>
                <Button
                  component="a"
                  href={waLink(
                    settings?.whatsappNumber || "919000000000",
                    `Hello, I would like details and pricing for ${page.h1}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  startIcon={<WhatsAppIcon sx={{ fontSize: "16px !important" }} />}
                  sx={{
                    color: "#00A859",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: 600,
                    p: 0,
                    "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                  }}
                >
                  Enquire on WhatsApp
                </Button>
              </Stack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}