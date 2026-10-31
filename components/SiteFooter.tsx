"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Logo from "@/components/Logo";
import { SEO_PAGES } from "@/lib/seo-pages";
import { waLink } from "@/lib/whatsapp";
import type { SettingsDTO } from "@/types";

const NAV: [string, string][] = [
  ["Boats", "/houseboats"],
  ["Gallery", "/gallery"],
  ["Services", "/services"],
  ["About Us", "/about-us"],
  ["Contact Us", "/contact-us"],
];

const linkSx = {
  color: "#CFE3EA",
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": { color: "#fff" },
};

export default function SiteFooter({ settings }: { settings: SettingsDTO }) {
  const pathname = usePathname();
  const whatsappUrl = waLink(
    settings.whatsappNumber || "919000000000",
    "Hello, I would like to make an enquiry."
  );

  const socials: [string, string][] = ([
    ["Instagram", settings.instagramUrl],
    ["Facebook", settings.facebookUrl],
    ["YouTube", settings.youtubeUrl],
    ["Tripadvisor", settings.tripadvisorUrl],
  ] as [string, string][]).filter(([, url]) => url);

  // Mobile bottom nav items
  const mobileNavItems = [
    { label: "Home", href: "/", icon: <HomeIcon fontSize="small" /> },
    { label: "Boats", href: "/houseboats", icon: <DirectionsBoatIcon fontSize="small" /> },
    { label: "Services", href: "/services", icon: <DesignServicesIcon fontSize="small" /> },
    { label: "Support", href: whatsappUrl, icon: <SupportAgentIcon fontSize="small" />, external: true },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#04385B",
        color: "#CFE3EA",
        mt: 9,
        pb: { xs: 8, md: 0 }, // Adds space on mobile so content isn't covered by the fixed bottom bar
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "1.2fr 0.8fr 1.2fr 0.8fr",
          },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* COLUMN 1: Brand Logo, Description & Chat Button */}
        <Box sx={{ maxWidth: 320 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              borderRadius: 3,
              px: 2,
              py: 1,
              display: "inline-block",
              mb: 2,
              textDecoration: "none",
            }}
          >
            <Logo height={84} alt={`${settings.siteName} logo`} />
          </Box>
          <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2.5, color: "#CFE3EA" }}>
            {settings.footerText ||
              "Alleppey backwater cruises on houseboats, kayaks and shikaras. Discover · Relax · Reconnect."}
          </Typography>
          <Button
            component="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            size="small"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: "#00A859",
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              "&:hover": { bgcolor: "#008F4C" },
            }}
          >
            Chat on WhatsApp
          </Button>
        </Box>

        {/* COLUMN 2: Explore Navigation */}
        <Stack spacing={1.2} component="nav" aria-label="Explore Navigation">
          <Typography fontWeight={700} color="#fff" sx={{ mb: 0.5, fontSize: 16 }}>
            Explore
          </Typography>
          {NAV.map(([label, href]) => (
            <Typography
              key={href}
              component={Link}
              href={href}
              variant="body2"
              sx={linkSx}
            >
              {label}
            </Typography>
          ))}
        </Stack>

        {/* COLUMN 3: Alleppey Services */}
        <Stack spacing={1.2} component="nav" aria-label="Alleppey houseboat services">
          <Typography fontWeight={700} color="#fff" sx={{ mb: 0.5, fontSize: 16 }}>
            Alleppey services
          </Typography>
          {SEO_PAGES.map((p) => (
            <Typography
              key={p.slug}
              component={Link}
              href="/services"
              variant="body2"
              sx={linkSx}
            >
              {p.h1}
            </Typography>
          ))}
        </Stack>

        {/* COLUMN 4: Contact Details */}
        <Stack spacing={1.2} alignItems="flex-start">
          <Typography fontWeight={700} color="#fff" sx={{ mb: 0.5, fontSize: 16 }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ color: "#CFE3EA" }}>
            {settings.address || "Alleppey (Alappuzha), Kerala"}
          </Typography>
          {settings.whatsappNumber && (
            <Typography variant="body2" sx={{ color: "#CFE3EA" }}>
              +{settings.whatsappNumber}
            </Typography>
          )}
          {settings.email && (
            <Typography variant="body2" sx={{ color: "#CFE3EA" }}>
              {settings.email}
            </Typography>
          )}
          {socials.map(([label, url]) => (
            <Typography
              key={label}
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer me"
              variant="body2"
              sx={linkSx}
            >
              {label}
            </Typography>
          ))}
        </Stack>
      </Container>

      {/* Copyright Strip */}
      <Box
        sx={{
          borderTop: "1px solid #1B5A80",
          py: 2.5,
          textAlign: "center",
          fontSize: 13,
          color: "#A2C4D3",
        }}
      >
        © {new Date().getFullYear()} {settings.siteName || "Alleppey Mermaid Houseboats"}. Houseboats in Alleppey (Alappuzha), Kerala. All rights reserved.
      </Box>

      {/* ---------------------------------------------------- */}
      {/* MOBILE FIXED BOTTOM NAVIGATION BAR                   */}
      {/* ---------------------------------------------------- */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "#042842",
          borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 1200,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
          justifyContent: "space-around",
          py: 1,
        }}
      >
        {mobileNavItems.map((item) => {
          const isActive = !item.external && pathname === item.href;
          return (
            <Box
              key={item.label}
              component={item.external ? "a" : Link}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: isActive ? "#FDE7B0" : "#CFE3EA",
                flex: 1,
                py: 0.5,
                textAlign: "center",
                transition: "color 0.2s ease",
                "&:hover": { color: "#fff" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 0.3 }}>
                {item.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  lineHeight: 1,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}