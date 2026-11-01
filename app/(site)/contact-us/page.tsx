import type { Metadata } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import { getSettings } from "@/lib/settings";
import { telLink, waLink } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Contact Alleppey Mermaid Houseboats | WhatsApp Enquiry",
  description:
    "Contact Alleppey Mermaid Houseboats on WhatsApp or phone to enquire about houseboat packages, day cruises and backwater tours in Alappuzha, Kerala.",
  path: "/contact-us",
  keywords: [
    "contact alleppey houseboat",
    "alleppey houseboat whatsapp",
    "alappuzha houseboat enquiry",
  ],
});

const card = {
  bgcolor: "#fff",
  border: "1px solid #EAEAEA",
  borderRadius: 3,
  p: 3,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "#006C9C",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
};

export default async function ContactPage() {
  const settings = await getSettings();
  await connectDB();
  const docs = (await Boat.find({ active: true })
    .select("name")
    .sort({ name: 1 })
    .lean()) as unknown as { name: string }[];
  const boats = docs.map((b) => b.name);
  const phone = settings.callNumber || settings.whatsappNumber;

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "#2B3A42", pb: 10 }}>
      {/* Reusable Hero Component */}
      <Hero
        eyebrow="✨ ALLEPPEY MERMAID HOUSEBOATS"
        title="Get in Touch & Enquire"
        subtitle="Connect with us directly on WhatsApp or submit your requirements for instant rates and custom itinerary assistance."
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Quick Contact Info */}
          <Stack spacing={2.5}>
            <Box
              sx={{
                ...card,
                bgcolor: "#00A859",
                borderColor: "#00A859",
                color: "#fff",
                "&:hover": { bgcolor: "#008F4C" },
              }}
            >
              <Typography fontWeight={700} fontSize={18} sx={{ mb: 0.5 }}>
                Instant WhatsApp Support
              </Typography>
              <Typography sx={{ mb: 2, color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                {settings.whatsappNumber
                  ? `+${settings.whatsappNumber}`
                  : "Add the number in Admin → Settings"}
              </Typography>
              <Button
                component="a"
                href={waLink(
                  settings.whatsappNumber,
                  "Hello, I would like to make an enquiry."
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<WhatsAppIcon />}
                sx={{
                  bgcolor: "#fff",
                  color: "#00A859",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  "&:hover": { bgcolor: "#F0F0F0" },
                }}
              >
                Chat on WhatsApp
              </Button>
            </Box>

            {phone && (
              <Box sx={card}>
                <Typography fontWeight={700} color="#042842" sx={{ mb: 0.5 }}>
                  Phone Helpline
                </Typography>
                <Typography
                  component="a"
                  href={telLink(phone)}
                  sx={{
                    color: "#006C9C",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  +{phone}
                </Typography>
              </Box>
            )}

            {settings.email && (
              <Box sx={card}>
                <Typography fontWeight={700} color="#042842" sx={{ mb: 0.5 }}>
                  Email Address
                </Typography>
                <Typography color="text.secondary" fontSize={15}>
                  {settings.email}
                </Typography>
              </Box>
            )}

            {settings.address && (
              <Box sx={card}>
                <Typography fontWeight={700} color="#042842" sx={{ mb: 0.5 }}>
                  Boarding Jetty Address
                </Typography>
                <Typography color="text.secondary" fontSize={15} sx={{ lineHeight: 1.6 }}>
                  {settings.address}
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Right Column: Contact Form */}
          <Box
            sx={{
              bgcolor: "#fff",
              border: "1px solid #EAEAEA",
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            }}
          >
            <ContactForm whatsapp={settings.whatsappNumber} boats={boats} />
          </Box>
        </Box>

        {/* Embedded Google Map */}
        {settings.googleMapsUrl && (
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="#042842"
              sx={{ mb: 2 }}
            >
              Our Location in Alleppey
            </Typography>
            <Box
              component="iframe"
              src={settings.googleMapsUrl}
              title="Map of Alleppey Mermaid Houseboats"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{
                width: "100%",
                height: 360,
                border: 0,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}