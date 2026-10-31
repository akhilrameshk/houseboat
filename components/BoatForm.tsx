"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, FormControlLabel, MenuItem, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import ImageUploader from "@/components/ImageUploader";
import { api } from "@/lib/api";
import type { BoatDTO, BoatTypeDTO, ImageDTO } from "@/types";

interface FormState {
  name: string;
  type: string;
  description: string;
  capacity: string;
  duration: string;
  price: string;
  routeFrom: string;
  routeTo: string;
  routeStops: string;
  routeImage: ImageDTO | null;
  images: ImageDTO[];
  featured: boolean;
  active: boolean;
  showInHomeGallery: boolean;
  sortOrder: string;
  seoTitle: string;
  seoDescription: string;
}

type TextKey = "name" | "type" | "description" | "capacity" | "duration" | "price" | "routeFrom" | "routeTo" | "routeStops" | "sortOrder" | "seoTitle" | "seoDescription";
type FlagKey = "featured" | "active" | "showInHomeGallery";

function initial(b?: BoatDTO): FormState {
  return {
    name: b?.name ?? "",
    type: b?.type ?? "",
    description: b?.description ?? "",
    capacity: b?.capacity ?? "",
    duration: b?.duration ?? "",
    price: b?.price != null ? String(b.price) : "",
    routeFrom: b?.routeFrom ?? "",
    routeTo: b?.routeTo ?? "",
    routeStops: b?.routeStops ?? "",
    routeImage: b?.routeImage ?? null,
    images: b?.images ?? [],
    featured: b?.featured ?? false,
    active: b?.active ?? true,
    showInHomeGallery: b?.showInHomeGallery ?? true,
    sortOrder: String(b?.sortOrder ?? 0),
    seoTitle: b?.seoTitle ?? "",
    seoDescription: b?.seoDescription ?? "",
  };
}

export default function BoatForm({ boat, types: initialTypes }: { boat?: BoatDTO; types: BoatTypeDTO[] }) {
  const router = useRouter();
  const [f, setF] = useState<FormState>(initial(boat));
  const [types, setTypes] = useState<BoatTypeDTO[]>(initialTypes);
  const [newType, setNewType] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: TextKey) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const flag = (k: FlagKey) => (e: ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.checked });

  const addType = async () => {
    if (newType.trim().length < 2) return;
    try {
      const { type } = await api<{ type: BoatTypeDTO }>("/api/types", { method: "POST", body: { name: newType } });
      setTypes((t) => (t.some((x) => x.slug === type.slug) ? t : [...t, type]));
      setF((x) => ({ ...x, type: type.slug }));
      setNewType("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add type");
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const body = { ...f, price: f.price === "" ? null : Number(f.price), sortOrder: Number(f.sortOrder) || 0 };
    try {
      await api(boat ? `/api/boats/${boat._id}` : "/api/boats", { method: boat ? "PUT" : "POST", body });
      router.push("/admin/boats");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
      setBusy(false);
    }
  };

  return (
    <Paper component="form" onSubmit={submit} variant="outlined" sx={{ p: { xs: 2, md: 3.5 }, borderRadius: 4, maxWidth: 900 }}>
      <Stack spacing={2.5}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <TextField label="Boat name" value={f.name} onChange={set("name")} required slotProps={{ htmlInput: { maxLength: 120 } }} />
          <TextField select label="Boat type" value={f.type} onChange={set("type")} required helperText="Add a new type below if needed">
            {types.map((t) => <MenuItem key={t.slug} value={t.slug}>{t.name}</MenuItem>)}
          </TextField>
        </Box>
        <Stack direction="row" spacing={1}>
          <TextField size="small" label="New type (e.g. Kayaking)" value={newType} onChange={(e) => setNewType(e.target.value)} slotProps={{ htmlInput: { maxLength: 40 } }} />
          <Button variant="outlined" onClick={addType}>Add type</Button>
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <TextField label="Route from" value={f.routeFrom} onChange={set("routeFrom")} slotProps={{ htmlInput: { maxLength: 120 } }} />
          <TextField label="Route to" value={f.routeTo} onChange={set("routeTo")} slotProps={{ htmlInput: { maxLength: 120 } }} />
          <TextField label="Route stops (optional)" value={f.routeStops} onChange={set("routeStops")} slotProps={{ htmlInput: { maxLength: 300 } }} />
          <TextField label="Capacity (e.g. Sleeps 6 · 2 bedrooms)" value={f.capacity} onChange={set("capacity")} slotProps={{ htmlInput: { maxLength: 100 } }} />
          <TextField label="Duration (e.g. 4 - 6 hours)" value={f.duration} onChange={set("duration")} slotProps={{ htmlInput: { maxLength: 100 } }} />
          <TextField label="Starting price ₹ (optional)" type="number" value={f.price} onChange={set("price")} slotProps={{ htmlInput: { min: 0 } }} />
        </Box>
        <TextField label="Description (write 2-3 natural sentences mentioning Alleppey)" value={f.description} onChange={set("description")} multiline minRows={4} slotProps={{ htmlInput: { maxLength: 5000 } }} />
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>Route image</Typography>
          <ImageUploader images={f.routeImage ? [f.routeImage] : []} onChange={(a) => setF({ ...f, routeImage: a[0] ?? null })} label="Upload route image" />
        </Box>
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>Boat gallery (first image is the cover)</Typography>
          <ImageUploader images={f.images} onChange={(images) => setF({ ...f, images })} multiple label="Add images" />
        </Box>
        <Box sx={{ p: 2, bgcolor: "#EEF5F8", borderRadius: 3 }}>
          <Typography fontWeight={700} sx={{ mb: 0.5 }}>Search engine (SEO)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Optional. Leave empty to use an automatic title and description.</Typography>
          <Stack spacing={2}>
            <TextField label="SEO title" value={f.seoTitle} onChange={set("seoTitle")} helperText={`${f.seoTitle.length}/60 - include "Alleppey" and the boat type`} slotProps={{ htmlInput: { maxLength: 70 } }} />
            <TextField label="SEO description" value={f.seoDescription} onChange={set("seoDescription")} multiline minRows={2} helperText={`${f.seoDescription.length}/155`} slotProps={{ htmlInput: { maxLength: 170 } }} />
          </Stack>
        </Box>
        <Stack>
          <FormControlLabel control={<Switch checked={f.active} onChange={flag("active")} />} label="Visible on the website" />
          <FormControlLabel control={<Switch checked={f.featured} onChange={flag("featured")} />} label="Featured (shown first on the home page)" />
          <FormControlLabel control={<Switch checked={f.showInHomeGallery} onChange={flag("showInHomeGallery")} />} label="Show this boat's photos in the home gallery" />
        </Stack>
        <TextField label="Sort order (lower shows first)" type="number" value={f.sortOrder} onChange={set("sortOrder")} sx={{ maxWidth: 240 }} slotProps={{ htmlInput: { min: 0, max: 9999 } }} />
        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button onClick={() => router.push("/admin/boats")}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={busy}>{busy ? "Saving..." : boat ? "Save changes" : "Save boat"}</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
