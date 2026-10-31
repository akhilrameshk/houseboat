import { Stack, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import BoatType from "@/models/BoatType";
import BoatForm from "@/components/BoatForm";
import { plain } from "@/lib/serialize";
import type { BoatTypeDTO } from "@/types";

export default async function NewBoat() {
  await connectDB();
  const types = plain<BoatTypeDTO[]>(await BoatType.find().sort({ name: 1 }).lean());
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">Add new boat</Typography>
      <BoatForm types={types} />
    </Stack>
  );
}
