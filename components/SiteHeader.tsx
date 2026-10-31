"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Logo from "@/components/Logo";
import { waLink } from "@/lib/whatsapp";

export const NAV: { label: string; href: string }[] = [
  { label: "Boats", href: "/houseboats" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

interface Props {
  siteName: string;
  whatsapp: string;
}

export default function SiteHeader({ siteName, whatsapp }: Props) {
  const path = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const wa = waLink(whatsapp, "Hello, I would like to make an enquiry.");

  return (
    <AppBar
      position="absolute"
      color="transparent"
      elevation={0}
      component="header"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        bgcolor: "transparent",
        borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes headerWaPulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(0, 168, 89, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0); }
        }
        .header-wa-btn-animated {
          animation: headerWaPulse 2.3s infinite ease-in-out;
        }
      `,
        }}
      />

      <Toolbar
        component="nav"
        aria-label="Main"
        sx={{ maxWidth: 1200, width: "100%", mx: "auto", gap: 3, py: 1 }}
      >
        {/* Brand Logo inside hero overlay header */}
        <Box
          component={Link}
          href="/"
          aria-label={`${siteName} home`}
          sx={{ display: "flex", mr: "auto", textDecoration: "none" }}
        >
          <Logo height={100} priority />
        </Box>

        {/* Desktop Navigation Overlay Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
          {NAV.map((n) => (
            <Button
              key={n.href}
              component={Link}
              href={n.href}
              sx={{
                borderRadius: 0,
                px: 0.5,
                py: 1,
                minWidth: 0,
                fontWeight: isActive(n.href) ? 700 : 500,
                color: isActive(n.href) ? "#FDE7B0" : "#FFFFFF",
                borderBottom: isActive(n.href) ? "2.5px solid #FDE7B0" : "2.5px solid transparent",
                textTransform: "none",
                fontSize: 15,
                "&:hover": { bgcolor: "transparent", color: "#FDE7B0" },
              }}
            >
              {n.label}
            </Button>
          ))}

          {/* Book Now WhatsApp CTA */}
          <Button
            component="a"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            className="header-wa-btn-animated"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: "#00A859",
              color: "#fff",
              textTransform: "none",
              px: 2.5,
              py: 0.9,
              borderRadius: 2.5,
              fontWeight: 600,
              fontSize: 14,
              "&:hover": { bgcolor: "#008F4C" },
            }}
          >
            Book Now
          </Button>
        </Box>

        {/* Mobile Hamburger Icon */}
        <IconButton
          sx={{ display: { md: "none" }, color: "#fff" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 270, p: 2 }}>
          <List>
            {NAV.map((n) => (
              <ListItemButton
                key={n.href}
                component={Link}
                href={n.href}
                selected={isActive(n.href)}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemText
                  primary={n.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(n.href) ? 700 : 500,
                    color: isActive(n.href) ? "#006C9C" : "text.primary",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ p: 1, mt: 2 }}>
            <Button
              fullWidth
              component="a"
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="success"
              className="header-wa-btn-animated"
              startIcon={<WhatsAppIcon />}
              sx={{
                bgcolor: "#00A859",
                textTransform: "none",
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { bgcolor: "#008F4C" },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}