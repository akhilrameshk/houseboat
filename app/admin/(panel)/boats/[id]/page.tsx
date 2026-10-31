import { notFound } from "next/navigation";
import { Stack, Typography } from "@mui/material";
import { connectDB } from "@/lib/db";
import Boat from "@/models/Boat";
import BoatType from "@/models/BoatType";
import BoatForm from "@/components/BoatForm";
import { isObjectId } from "@/lib/security";
import { plain } from "@/lib/serialize";
import type { BoatDTO, BoatTypeDTO } from "@/types";

export default async function EditBoat({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isObjectId(id)) notFound();
  await connectDB();
  const [boat, types] = await Promise.all([Boat.findById(id).lean(), BoatType.find().sort({ name: 1 }).lean()]);
  if (!boat) notFound();
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">Edit boat</Typography>
      <BoatForm boat={plain<BoatDTO>(boat)} types={plain<BoatTypeDTO[]>(types)} />
    </Stack>
  );
}
