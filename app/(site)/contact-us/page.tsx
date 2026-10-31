import type { Metadata } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getSettings } from "@/lib/settings";
import { telLink, waLink } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Contact Alleppey Mermaid Houseboats | WhatsApp Enquiry",
  description: "Contact Alleppey Mermaid Houseboats on WhatsApp or phone to enquire about houseboat packages, day cruises and backwater tours in Alappuzha, Kerala.",
  path: "/contact-us",
  keywords: ["contact alleppey houseboat", "alleppey houseboat whatsapp", "alappuzha houseboat enquiry"],
});

const card = { bgcolor: "#fff", border: "1px solid #E7E1D3", borderRadius: 4, p: 3 };

export default async function ContactPage() {
  const settings = await getSettings();
  await connectDB();
  const docs = (await Boat.find({ active: true }).select("name").sort({ name: 1 }).lean()) as unknown as { name: string }[];
  const boats = docs.map((b) => b.name);
  const phone = settings.callNumber || settings.whatsappNumber;

  return (
    <>
      <Box sx={{ background: "linear-gradient(135deg,#04385B,#0A5C85)", color: "#fff", py: 6 }}>
        <Container maxWidth="lg"  sx={{
          mt:10,}}>
          <Breadcrumbs light items={[{ name: "Contact Us", path: "/contact-us" }]} />
          <Typography variant="h1" sx={{ fontSize: 40, mb: 1 }}>Contact Us</Typography>
          <Typography sx={{ color: "#CFE3EA" }}>The fastest way to reach us is WhatsApp.</Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ pt: 5, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "flex-start" }}>
        <Stack spacing={2} sx={{ flex: "1 1 340px" }}>
          <Box sx={{ ...card, bgcolor: "#128C4A", borderColor: "#128C4A", color: "#fff" }}>
            <Typography fontWeight={700}>WhatsApp</Typography>
            <Typography sx={{ mb: 1.5 }}>{settings.whatsappNumber ? `+${settings.whatsappNumber}` : "Add the number in Admin → Settings"}</Typography>
            <Button component="a" href={waLink(settings.whatsappNumber, "Hello, I would like to make an enquiry.")} target="_blank" rel="noopener noreferrer" variant="contained" startIcon={<WhatsAppIcon />} sx={{ bgcolor: "#fff", color: "#128C4A", "&:hover": { bgcolor: "#f1f1f1" } }}>Chat now</Button>
          </Box>
          {phone && (
            <Box sx={card}>
              <Typography fontWeight={700}>Call</Typography>
              <Typography component="a" href={telLink(phone)} color="text.secondary" sx={{ textDecoration: "none" }}>+{phone}</Typography>
            </Box>
          )}
          {settings.email && <Box sx={card}><Typography fontWeight={700}>Email</Typography><Typography color="text.secondary">{settings.email}</Typography></Box>}
          {settings.address && <Box sx={card}><Typography fontWeight={700}>Address</Typography><Typography color="text.secondary">{settings.address}</Typography></Box>}
        </Stack>
        <Box sx={{ flex: "1 1 400px" }}>
          <ContactForm whatsapp={settings.whatsappNumber} boats={boats} />
        </Box>
      </Container>
      {settings.googleMapsUrl && (
        <Container maxWidth="lg" sx={{ pt: 4 }}>
          <Box component="iframe" src={settings.googleMapsUrl} title="Map of Alleppey Mermaid Houseboats" loading="lazy" referrerPolicy="no-referrer-when-downgrade" sx={{ width: "100%", height: 320, border: 0, borderRadius: 4 }} />
        </Container>
      )}
    </>
  );
}
