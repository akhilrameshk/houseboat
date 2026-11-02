"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import type { GalleryItemDTO } from "@/types";

interface Props {
  items: GalleryItemDTO[];
}

export default function AutoRotatingGalleryGrid({ items }: Props) {
  const [rotatedItems, setRotatedItems] = useState<GalleryItemDTO[]>(items);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setRotatedItems(items);
  }, [items]);

  useEffect(() => {
    if (isPaused || rotatedItems.length <= 1) return;

    // 10-second timer to shift photo positions forward in the grid
    const interval = setInterval(() => {
      setRotatedItems((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isPaused, rotatedItems.length]);

  if (items.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", py: 8 }}>
        Photos will appear here soon.
      </Typography>
    );
  }

  return (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        // Auto-fit varied heights using CSS grid auto-flow
        gridAutoRows: { xs: "110px", sm: "140px", md: "170px" },
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        pb: 4,
      }}
    >
      {rotatedItems.map((img, index) => {
        // Create an alternating pattern of varied card heights/spans
        const isTall = index % 5 === 0; // Every 5th item spans 2 rows tall
        const isWide = index % 7 === 0; // Every 7th item spans 2 columns wide

        return (
          <Box
            key={`${img._id || index}-${index}`}
            className="gallery-card"
            sx={{
              position: "relative",
              width: "100%",
              gridRow: isTall ? "span 2" : "span 1",
              gridColumn: isWide ? "span 2" : "span 1",
              borderRadius: 3.5,
              overflow: "hidden",
              boxShadow: "0 8px 22px rgba(4, 40, 66, 0.08)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px) scale(1.01)",
                boxShadow: "0 14px 32px rgba(4, 40, 66, 0.18)",
                zIndex: 2,
                "& .gallery-overlay": { opacity: 1 },
                "& img": { transform: "scale(1.06)" },
              },
            }}
          >
            <Image
              src={img.url}
              alt={img.caption || "Alleppey houseboat photo"}
              fill
              sizes="(max-width: 600px) 50vw, 33vw"
              loading={index < 6 ? "eager" : "lazy"}
              style={{
                objectFit: "cover",
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            />

           
          </Box>
        );
      })}
    </Box>
  );
}