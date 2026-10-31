import Link from "next/link";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import GalleryItem from "@/models/GalleryItem";
import BoatType from "@/models/BoatType";

export default async function Dashboard() {
  await connectDB();
  const [boats, active, photos, types] = await Promise.all([
    Boat.countDocuments(),
    Boat.countDocuments({ active: true }),
    GalleryItem.countDocuments(),
    BoatType.countDocuments(),
  ]);

  const stats: [string, number][] = [
    ["Boats", boats],
    ["Visible boats", active],
    ["Boat types", types],
    ["Gallery photos", photos],
  ];

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" },
          gap: 2,
        }}
      >
        {stats.map(([k, v]) => (
          <Paper key={k} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight={800}>
              {v}
            </Typography>
            <Typography color="text.secondary">{k}</Typography>
          </Paper>
        ))}
      </Box>

      <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
        <Link href="/admin/boats/new" passHref style={{ textDecoration: "none" }}>
          <Button variant="contained">+ Add boat</Button>
        </Link>
        <Link href="/admin/gallery" passHref style={{ textDecoration: "none" }}>
          <Button variant="outlined">Manage gallery</Button>
        </Link>
        <Link href="/admin/settings" passHref style={{ textDecoration: "none" }}>
          <Button variant="outlined">Settings and SEO</Button>
        </Link>
      </Stack>
    </Stack>
  );
}