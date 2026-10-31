import Image from "next/image";
import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { waLink } from "@/lib/whatsapp";
import type { BoatDTO } from "@/types";

interface Props {
  boat: BoatDTO;
  typeName?: string;
  whatsapp: string;
}

export default function BoatCard({ boat, typeName, whatsapp }: Props) {
  const img = boat?.images[0];
  const route = [boat?.routeFrom, boat?.routeTo].filter(Boolean).join(" → ");
  const msg = `Hello, I would like to enquire about ${boat.name}.`;

  return (
    <Card
      variant="outlined"
      component="article"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 12px 28px rgba(4,56,91,.13)",
      }}
    >
      <Box
        component="a"
        href={`/houseboats/${boat.slug}`}
        sx={{
          position: "relative",
          display: "block",
          height: 190,
          bgcolor: "primary.main",
        }}
      >
        {img && (
          <Image
            src={img.url}
            alt={`${boat.name} - ${typeName || "houseboat"} in Alleppey, Kerala`}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 1200px) 33vw, 290px"
            style={{ objectFit: "cover" }}
          />
        )}
        <Chip
          label={typeName || boat.type}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "#fff",
            fontWeight: 700,
          }}
        />
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontFamily: "var(--font-head), Georgia, serif" }}
        >
          <Box
            component="a"
            href={`/houseboats/${boat.slug}`}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            {boat.name}
          </Box>
        </Typography>

        {boat.capacity && (
          <Typography variant="body2" color="text.secondary">
            {boat.capacity}
          </Typography>
        )}

        {route && (
          <Typography variant="body2" fontWeight={600}>
            Route: {route}
          </Typography>
        )}

        <Box sx={{ flex: 1 }} />

        <Button
          component="a"
          href={waLink(whatsapp, msg)}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          sx={{ mt: 1.5 }}
        >
          Enquire on WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
}