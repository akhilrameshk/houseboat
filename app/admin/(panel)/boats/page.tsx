import Image from "next/image";
import { Box, Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import DeleteButton from "@/components/DeleteButton";
import { plain } from "@/lib/serialize";
import type { BoatDTO, BoatTypeDTO } from "@/types";

export default async function AdminBoats() {
  await connectDB();
  const [boats, types] = await Promise.all([
    Boat.find().sort({ sortOrder: 1, createdAt: -1 }).lean().then((r) => plain<BoatDTO[]>(r)),
    BoatType.find().lean().then((r) => plain<BoatTypeDTO[]>(r)),
  ]);
  const typeName = Object.fromEntries(types.map((t) => [t.slug, t.name]));

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1">Boats</Typography>
        <Button component="a" href="/admin/boats/new" variant="contained">+ Add boat</Button>
      </Stack>
      <Paper variant="outlined" sx={{ borderRadius: 3, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boats.map((b) => (
              <TableRow key={b._id} hover>
                <TableCell>
                  <Box sx={{ position: "relative", width: 56, height: 40, borderRadius: 1, bgcolor: "#E4EEF0", overflow: "hidden" }}>
                    {b.images[0] && <Image src={b.images[0].url} alt="" fill sizes="56px" style={{ objectFit: "cover" }} />}
                  </Box>
                </TableCell>
                <TableCell><b>{b.name}</b></TableCell>
                <TableCell>{typeName[b.type] || b.type}</TableCell>
                <TableCell>{[b.routeFrom, b.routeTo].filter(Boolean).join(" → ") || "-"}</TableCell>
                <TableCell><Chip size="small" label={b.active ? "Active" : "Hidden"} color={b.active ? "success" : "default"} /></TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <Button component="a" href={`/admin/boats/${b._id}`} size="small">Edit</Button>
                  <DeleteButton url={`/api/boats/${b._id}`} confirmText={`Delete "${b.name}" and its images?`} />
                </TableCell>
              </TableRow>
            ))}
            {boats.length === 0 && <TableRow><TableCell colSpan={6}>No boats yet. Click "Add boat".</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}