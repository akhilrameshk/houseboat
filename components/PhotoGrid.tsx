"use client";
import { useState } from "react";
import Image from "next/image";
import { Box, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface Photo {
  url: string;
  caption?: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Masonry-style photo grid with a simple lightbox. Width/height avoid layout shift.
export default function PhotoGrid({ images, fallbackAlt = "Alleppey houseboat backwater cruise photo" }: { images: Photo[]; fallbackAlt?: string }) {
  const [open, setOpen] = useState<Photo | null>(null);
  const altOf = (p: Photo) => p.alt || p.caption || fallbackAlt;
  return (
    <>
      <Box sx={{ columnCount: { xs: 2, md: 3 }, columnGap: "16px" }}>
        {images.map((im, i) => (
          <Box
            key={im.url + i}
            role="button"
            tabIndex={0}
            aria-label={`Open photo: ${altOf(im)}`}
            onClick={() => setOpen(im)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpen(im);
            }}
            sx={{ mb: 2, cursor: "zoom-in", breakInside: "avoid", borderRadius: 3, overflow: "hidden", lineHeight: 0 }}
          >
            <Image src={im.url} alt={altOf(im)} width={im.width || 800} height={im.height || 600} sizes="(max-width: 900px) 50vw, 33vw" loading={i < 2 ? "eager" : "lazy"} style={{ width: "100%", height: "auto" }} />
          </Box>
        ))}
      </Box>
      <Dialog open={!!open} onClose={() => setOpen(null)} maxWidth="lg">
        <IconButton onClick={() => setOpen(null)} aria-label="Close" sx={{ position: "absolute", right: 8, top: 8, zIndex: 1, bgcolor: "rgba(255,255,255,.8)" }}>
          <CloseIcon />
        </IconButton>
        {open && (
          <Image src={open.url} alt={altOf(open)} width={open.width || 1600} height={open.height || 1000} sizes="90vw" style={{ width: "auto", maxWidth: "100%", maxHeight: "88vh", height: "auto", display: "block" }} />
        )}
      </Dialog>
    </>
  );
}
