"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import BoatCard from "@/components/BoatCard";
import type { BoatDTO, GalleryItemDTO } from "@/types";

interface Props {
  groupedBoats: Record<string, BoatDTO[]>;
  typeDisplayOrder: string[];
  typeNameMap: Record<string, string>;
  whatsapp: string;
  activeGallery: GalleryItemDTO[];
}

export default function AutoRotatingBoatLists({
  groupedBoats,
  typeDisplayOrder,
  typeNameMap,
  whatsapp,
  activeGallery,
}: Props) {
  // Ensure "houseboat" is 1st and "kayaking" is 2nd
  const priorityOrder = ["house-boat", "kayaking", "shikara", "speedboat"];
  const orderedCatKeys = Array.from(
    new Set([
      ...priorityOrder.filter((k) => k in groupedBoats),
      ...typeDisplayOrder.filter((k) => k in groupedBoats),
      ...Object.keys(groupedBoats),
    ])
  );

  // Refs for auto-scroll containers
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 30-second interval timer for auto-rotation
    const interval = setInterval(() => {
      // 1. Rotate Boat List Horizontal Scrolls
      orderedCatKeys.forEach((catKey) => {
        const container = categoryRefs.current[catKey];
        if (container && container.scrollWidth > container.clientWidth) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const scrollStep = container.clientWidth * 0.8; // Scroll 80% width per tick

          if (container.scrollLeft + scrollStep >= maxScroll - 10) {
            // Loop back to the start
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: scrollStep, behavior: "smooth" });
          }
        }
      });

      // 2. Rotate Gallery Horizontal Scroll
      if (
        galleryRef.current &&
        galleryRef.current.scrollWidth > galleryRef.current.clientWidth
      ) {
        const container = galleryRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const scrollStep = 260; // Card width + gap

        if (container.scrollLeft + scrollStep >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }
    }, 30000); // Rotates every 30 seconds

    return () => clearInterval(interval);
  }, [orderedCatKeys]);

  const sectionTitle = {
    fontFamily: "serif",
    fontSize: 32,
    fontWeight: 700,
    color: "#042842",
    mb: 0.5,
  } as const;

  const outlineBtn = {
    borderColor: "#D0D0D0",
    color: "#2B3A42",
    textTransform: "none",
    borderRadius: 2,
    px: 2,
    "&:hover": { borderColor: "#006C9C", bgcolor: "transparent" },
  } as const;

  return (
    <>
      {/* Categorized Boats Sections */}
      <Container maxWidth="lg" component="section" sx={{ pt: 6, pb: 4 }}>
        {orderedCatKeys.map((catKey) => {
          const categoryBoats = groupedBoats[catKey];
          if (!categoryBoats || categoryBoats.length === 0) return null;

          const categoryTitle =
            typeNameMap[catKey] ||
            catKey.charAt(0).toUpperCase() + catKey.slice(1) + "s";

          return (
            <Box key={catKey} sx={{ mb: 6 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h2" sx={sectionTitle}>
                    {categoryTitle}
                  </Typography>
                  <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
                    Explore our top  packages.
                  </Typography>
                </Box>
                <Link href={`/houseboats`} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" size="small" sx={outlineBtn}>
                    View all →
                  </Button>
                </Link>
              </Stack>

              {/* Auto-Rotating Swiper Row */}
              <Box
                ref={(el: HTMLDivElement | null) => {
                  categoryRefs.current[catKey] = el;
                }}
                sx={{
                  display: { xs: "flex", md: "grid" },
                  gridTemplateColumns: { md: "repeat(4, 1fr)" },
                  gap: 2.5,
                  overflowX: { xs: "auto", md: "visible" },
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  WebkitOverflowScrolling: "touch",
                  pb: { xs: 2, md: 0 },
                  mx: { xs: -2, md: 0 },
                  px: { xs: 2, md: 0 },
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {categoryBoats.slice(0, 8).map((b) => (
                  <Box
                    key={b._id}
                    sx={{
                      minWidth: { xs: "78vw", sm: "45vw", md: "100%" },
                      width: { xs: "78vw", sm: "45vw", md: "100%" },
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <BoatCard
                      boat={b}
                      typeName={typeNameMap[b.type] || categoryTitle}
                      whatsapp={whatsapp}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Link href="/houseboats" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#006C9C",
                textTransform: "none",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { bgcolor: "#00557A" },
              }}
            >
              View complete boat fleet
            </Button>
          </Link>
        </Box>
      </Container>

      {/* Auto-Rotating Gallery Section */}
      <Container maxWidth="lg" component="section" sx={{ pt: 4, pb: 4 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 2.5,
          }}
        >
          <Box>
            <Typography variant="h2" sx={sectionTitle}>
              Gallery
            </Typography>
            <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
              Moments from our trips.
            </Typography>
          </Box>
          <Button
            component="a"
            href="/gallery"
            variant="outlined"
            size="small"
            sx={outlineBtn}
          >
            View gallery →
          </Button>
        </Stack>
        <Box
          ref={galleryRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {activeGallery.map((g) => (
            <Box
              key={g._id}
              sx={{
                position: "relative",
                width: 240,
                height: 170,
                flexShrink: 0,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Image
                src={g.url}
                alt={g.caption || "Alleppey houseboat photo"}
                fill
                sizes="240px"
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}