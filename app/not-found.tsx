import type { Metadata } from "next";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center", p: 3 }}>
      <Box>
        <Typography variant="h1" sx={{ fontSize: 44, mb: 1 }}>Page not found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>The page you are looking for does not exist.</Typography>
        <Button component={Link} href="/" variant="contained">Back to home</Button>
      </Box>
    </Box>
  );
}
