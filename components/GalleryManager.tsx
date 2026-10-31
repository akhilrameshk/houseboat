"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Alert, Box, Button, Card, CardContent, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import ImageUploader from "@/components/ImageUploader";
import DeleteButton from "@/components/DeleteButton";
import { api } from "@/lib/api";
import type { GalleryItemDTO, ImageDTO } from "@/types";

interface BoatOption {
  _id: string;
  name: string;
}

export default function GalleryManager({ items, boats }: { items: GalleryItemDTO[]; boats: BoatOption[] }) {
  const router = useRouter();
  const [boat, setBoat] = useState("");
  const [showOnHome, setShowOnHome] = useState(true);
  const [caption, setCaption] = useState("");
  const [pending, setPending] = useState<ImageDTO[]>([]);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState<GalleryItemDTO | null>(null);
  const boatName: Record<string, string> = Object.fromEntries(boats.map((b) => [b._id, b.name]));

  const saveNew = async () => {
    setError("");
    try {
      for (const im of pending) {
        await api("/api/gallery", { method: "POST", body: { ...im, caption, boat: boat || null, showOnHome } });
      }
      setPending([]);
      setCaption("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    }
  };

  const saveEdit = async () => {
    if (!edit) return;
    try {
      await api(`/api/gallery/${edit._id}`, { method: "PUT", body: { caption: edit.caption || "", boat: edit.boat || null, showOnHome: !!edit.showOnHome } });
      setEdit(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    }
  };

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add images</Typography>
        <Stack spacing={2}>
          <ImageUploader images={pending} onChange={setPending} multiple label="Choose photos" />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
            <TextField select label="Boat" value={boat} onChange={(e) => setBoat(e.target.value)}>
              <MenuItem value="">General (no boat)</MenuItem>
              {boats.map((b) => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
            </TextField>
            <TextField label="Caption / alt text (e.g. Houseboat cruising Alleppey backwaters)" value={caption} onChange={(e) => setCaption(e.target.value)} slotProps={{ htmlInput: { maxLength: 200 } }} />
          </Box>
          <FormControlLabel control={<Checkbox checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} />} label="Show on the home page gallery" />
          <Box><Button variant="contained" disabled={!pending.length} onClick={saveNew}>Save {pending.length || ""} image{pending.length === 1 ? "" : "s"}</Button></Box>
        </Stack>
      </Paper>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)", xl: "repeat(4,1fr)" }, gap: 2.5 }}>
        {items.map((g) => (
          <Card key={g._id} variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ position: "relative", height: 150 }}>
              <Image src={g.url} alt={g.caption || "Gallery photo"} fill sizes="300px" style={{ objectFit: "cover" }} />
            </Box>
            <CardContent>
              <Typography fontWeight={700} noWrap>{g.caption || "No caption"}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{g.boat ? boatName[g.boat] || "Boat" : "General"}</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                <Chip size="small" label={g.showOnHome ? "On homepage" : "Hidden"} color={g.showOnHome ? "success" : "default"} />
                <Box>
                  <Button size="small" onClick={() => setEdit({ ...g })}>Edit</Button>
                  <DeleteButton url={`/api/gallery/${g._id}`} confirmText="Delete this image?" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      {items.length === 0 && <Typography color="text.secondary">No images yet.</Typography>}

      <Dialog open={!!edit} onClose={() => setEdit(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit image</DialogTitle>
        {edit && (
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Box sx={{ position: "relative", width: "100%", height: 260 }}>
                <Image src={edit.url} alt={edit.caption || "Gallery photo"} fill sizes="600px" style={{ objectFit: "cover", borderRadius: 8 }} />
              </Box>
              <TextField label="Caption / alt text" value={edit.caption || ""} onChange={(e) => setEdit({ ...edit, caption: e.target.value })} slotProps={{ htmlInput: { maxLength: 200 } }} />
              <TextField select label="Boat" value={edit.boat || ""} onChange={(e) => setEdit({ ...edit, boat: e.target.value || null })}>
                <MenuItem value="">General (no boat)</MenuItem>
                {boats.map((b) => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
              </TextField>
              <FormControlLabel control={<Checkbox checked={!!edit.showOnHome} onChange={(e) => setEdit({ ...edit, showOnHome: e.target.checked })} />} label="Show on the home page gallery" />
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setEdit(null)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
