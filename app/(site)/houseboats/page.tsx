"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
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
  const priorityOrder = ["house-boat", "kayaking", "shikara", "speedboat"];
  const orderedCatKeys = Array.from(
    new Set([
      ...priorityOrder.filter((k) => k in groupedBoats),
      ...typeDisplayOrder.filter((k) => k in groupedBoats),
      ...Object.keys(groupedBoats),
    ])
  );

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 10-second interval timer for auto-rotation
    const interval = setInterval(() => {
      // 1. Rotate Boat List Horizontal Scrolls
      orderedCatKeys.forEach((catKey) => {
        const container = categoryRefs.current[catKey];
        if (container && container.scrollWidth > container.clientWidth) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const scrollStep = container.clientWidth * 0.8;

          if (container.scrollLeft + scrollStep >= maxScroll - 10) {
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
        const scrollStep = 260;

        if (container.scrollLeft + scrollStep >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }
    }, 10000); // Rotates every 10 seconds

    return () => clearInterval(interval);
  }, [orderedCatKeys]);

  const sectionTitle = {
    fontFamily: "serif",
    fontSize: { xs: 26, md: 34 },
    fontWeight: 800,
    background: "linear-gradient(135deg, #042842 0%, #006C9C 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 0.5,
  } as const;

  const outlineBtn = {
    borderColor: "rgba(4, 40, 66, 0.2)",
    color: "#042842",
    textTransform: "none",
    borderRadius: 3,
    px: 2.5,
    py: 0.8,
    fontWeight: 700,
    fontSize: 13.5,
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      borderColor: "#006C9C",
      bgcolor: "rgba(0,108,156,0.06)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,108,156,0.15)",
    },
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
            <Box key={catKey} sx={{ mb: 7 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  mb: 2.5,
                }}
              >
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <SparklesIcon sx={{ fontSize: 18, color: "#006C9C" }} />
                    <Typography variant="h2" sx={sectionTitle}>
                      {categoryTitle}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 14.5, color: "text.secondary", fontWeight: 500 }}>
                    Explore our premier {categoryTitle.toLowerCase()} experiences in Alleppey.
                  </Typography>
                </Box>
                <Link href={`/houseboats`} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" size="small" sx={outlineBtn}>
                    View all →
                  </Button>
                </Link>
              </Stack>

              {/* Auto-Rotating Swiper Row with Premium Glow & Scroll Effects */}
              <Box
                ref={(el: HTMLDivElement | null) => {
                  categoryRefs.current[catKey] = el;
                }}
                sx={{
                  display: { xs: "flex", md: "grid" },
                  gridTemplateColumns: { md: "repeat(4, 1fr)" },
                  gap: 3,
                  overflowX: { xs: "auto", md: "visible" },
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  WebkitOverflowScrolling: "touch",
                  pb: { xs: 2.5, md: 1 },
                  mx: { xs: -2, md: 0 },
                  px: { xs: 2, md: 0 },
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {categoryBoats.slice(0, 8).map((b) => (
                  <Box
                    key={b._id}
                    sx={{
                      minWidth: { xs: "80vw", sm: "48vw", md: "100%" },
                      width: { xs: "80vw", sm: "48vw", md: "100%" },
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                      },
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

        {/* CTA Button */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Link href="/houseboats" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #042842 0%, #006C9C 100%)",
                textTransform: "none",
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 800,
                fontSize: 15,
                boxShadow: "0 8px 25px rgba(4, 40, 66, 0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #031D30 0%, #00557A 100%)",
                  boxShadow: "0 12px 35px rgba(4, 40, 66, 0.35)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              Explore Complete Fleet catalog
            </Button>
          </Link>
        </Box>
      </Container>

      {/* Auto-Rotating Premium Gallery Section */}
      <Container maxWidth="lg" component="section" sx={{ pt: 4, pb: 6 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h2" sx={sectionTitle}>
              Backwater Moments
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: "text.secondary", fontWeight: 500 }}>
              Authentic highlights captured onboard our cruises.
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
            gap: 2.5,
            overflowX: "auto",
            pb: 2,
            pt: 0.5,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {activeGallery.map((g) => (
            <Box
              key={g._id}
              sx={{
                position: "relative",
                width: 270,
                height: 185,
                flexShrink: 0,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(4, 40, 66, 0.08)",
                transition: "all 0.35s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.04)",
                  boxShadow: "0 14px 32px rgba(4, 40, 66, 0.2)",
                  "& .gallery-overlay": { opacity: 1 },
                  "& img": { transform: "scale(1.08)" },
                },
              }}
            >
              <Image
                src={g.url}
                alt={g.caption || "Alleppey houseboat photo"}
                fill
                sizes="270px"
                loading="lazy"
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              />
              {/* Subtle Gradient Overlay on Hover */}
              <Box
                className="gallery-overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(4,40,66,0.7) 0%, rgba(0,0,0,0) 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  p: 2,
                }}
              >
                <Typography variant="caption" color="#fff" fontWeight={600} fontSize={12.5}>
                  {g.caption || "Alleppey Backwaters"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}