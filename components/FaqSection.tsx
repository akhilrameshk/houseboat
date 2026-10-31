import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JsonLd from "@/components/JsonLd";
import { faqLd } from "@/lib/jsonld";
import type { FaqItem } from "@/types";

// Answers stay in the HTML (crawlable) and are also marked up as FAQPage structured data.
export default function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  return (
    <Box component="section">
      <JsonLd data={faqLd(faqs)} />
      <Typography variant="h2" sx={{ fontSize: 30, mb: 2.5 }}>{title}</Typography>
      {faqs.map((f) => (
        <Accordion key={f.q} disableGutters elevation={0} sx={{ border: "1px solid #E7E1D3", borderRadius: "12px !important", mb: 1.5, "&::before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="h3" fontWeight={700}>{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
