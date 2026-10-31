"use client";

import Link from "next/link";
import { Button, Stack } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function HeroActions({ waLink }: { waLink: string }) {
  return (
    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
      <Button
        component="a"
        href="/houseboats"
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#04385B",
          px: 3.5,
          py: 1.2,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { bgcolor: "#032B47" },
        }}
      >
        Explore Houseboats →
      </Button>
      <Button
        component="a"
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="success"
        size="large"
        startIcon={<WhatsAppIcon />}
        sx={{
          bgcolor: "#00A859",
          px: 3.5,
          py: 1.2,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { bgcolor: "#008F4C" },
        }}
      >
        Enquire on WhatsApp
      </Button>
    </Stack>
  );
}