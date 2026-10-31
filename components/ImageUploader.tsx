"use client";
import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Alert, Box, Button, CircularProgress, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadImage } from "@/lib/api";
import type { ImageDTO } from "@/types";

interface Props {
  images: ImageDTO[];
  onChange: (images: ImageDTO[]) => void;
  multiple?: boolean;
  label?: string;
}

export default function ImageUploader({ images, onChange, multiple = false, label = "Add images" }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

 const pick = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setError("");
    const added: ImageDTO[] = [];
    for (const f of multiple ? files : files.slice(0, 1)) {
      try {
        const r:any = await uploadImage(f);
        added.push({
          url: r.url,
          publicId: r.publicId,
          width: r.width,
          height: r.height,
          alt: r.alt ?? f.name.replace(/\.[^/.]+$/, "") ?? "", // Resolves missing 'alt' property
        });
      } catch (err) {
        setError(`${f.name}: ${err instanceof Error ? err.message : "Upload failed"}`);
      }
    }
    setBusy(false);
    if (added.length) onChange(multiple ? [...images, ...added] : added);
  };

  return (
    <Stack spacing={1.5}>
      {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1.5}>
        {images.map((im, i) => (
          <Box key={im.url} sx={{ position: "relative", width: 120, height: 90 }}>
            <Image src={im.url} alt="" fill sizes="120px" style={{ objectFit: "cover", borderRadius: 8 }} />
            <IconButton size="small" aria-label="Remove image" onClick={() => onChange(images.filter((_, j) => j !== i))} sx={{ position: "absolute", top: -8, right: -8, bgcolor: "#B3261E", color: "#fff", "&:hover": { bgcolor: "#8C1D18" } }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ))}
      </Stack>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple={multiple} hidden onChange={pick} />
      <Box>
        <Button variant="outlined" onClick={() => input.current?.click()} disabled={busy} startIcon={busy ? <CircularProgress size={16} /> : <AddPhotoAlternateIcon />}>
          {busy ? "Uploading..." : images.length && !multiple ? "Replace image" : label}
        </Button>
      </Box>
    </Stack>
  );
}
