"use client";

import { useEffect, useState } from "react";
import { Box, Fab, Stack, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { telLink, waLink } from "@/lib/whatsapp";

interface Props {
  whatsapp: string;
  phone: string;
}

export default function FloatingButtons({ whatsapp, phone }: Props) {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setAtBottom(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToggle = () => {
    window.scrollTo({
      top: atBottom ? 0 : document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      {/* Keyframe Animation Styles for Tempting Call Ring & Pulse Effects */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes phoneRing {
          0% { transform: rotate(0deg) scale(1); }
          10% { transform: rotate(14deg) scale(1.1); }
          20% { transform: rotate(-14deg) scale(1.1); }
          30% { transform: rotate(14deg) scale(1.1); }
          40% { transform: rotate(-14deg) scale(1.1); }
          50% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes phonePulse {
          0% { box-shadow: 0 0 0 0 rgba(253, 181, 21, 0.7); }
          70% { box-shadow: 0 0 0 14px rgba(253, 181, 21, 0); }
          100% { box-shadow: 0 0 0 0 rgba(253, 181, 21, 0); }
        }
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0.7); }
          70% { box-shadow: 0 0 0 14px rgba(0, 168, 89, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0); }
        }
        .pulse-phone-btn {
          animation: phonePulse 2.5s infinite;
        }
        .pulse-wa-btn {
          animation: waPulse 2.5s infinite 1.25s;
        }
        .animated-phone-icon {
          animation: phoneRing 2.5s infinite ease-in-out;
        }
      `,
        }}
      />

      {/* Right Bottom Floating Action Stack */}
      <Stack
        spacing={1.5}
        sx={{
          position: "fixed",
          right: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          zIndex: 1200,
          alignItems: "center",
        }}
      >
        {/* 1. Direct Call Floating CTA (First) */}
        {phone && (
          <Tooltip title="Call Us Directly" placement="left">
            <Fab
              component="a"
              href={telLink(phone)}
              aria-label="Call us"
              className="pulse-phone-btn"
              sx={{
                bgcolor: "#FDB515",
                color: "#042842",
                "&:hover": { bgcolor: "#e5a20d", transform: "scale(1.08)" },
                transition: "transform 0.2s ease",
              }}
            >
              <PhoneInTalkIcon className="animated-phone-icon" sx={{ fontSize: 26 }} />
            </Fab>
          </Tooltip>
        )}

        {/* 2. WhatsApp Floating CTA (Second) */}
        <Tooltip title="Chat on WhatsApp" placement="left">
          <Fab
            component="a"
            href={waLink(whatsapp, "Hello, I would like to make an enquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            color="success"
            aria-label="Chat on WhatsApp"
            className="pulse-wa-btn"
            sx={{
              bgcolor: "#00A859",
              color: "#fff",
              "&:hover": { bgcolor: "#008F4C", transform: "scale(1.08)" },
              transition: "transform 0.2s ease",
            }}
          >
            <WhatsAppIcon className="animated-phone-icon" sx={{ fontSize: 28 }} />
          </Fab>
        </Tooltip>

        {/* 3. Scroll Toggle Button (Third - Down at top, Up at bottom) */}
        <Tooltip title={atBottom ? "Scroll to top" : "Scroll to bottom"} placement="left">
          <Fab
            onClick={handleScrollToggle}
            size="small"
            aria-label={atBottom ? "Scroll to top" : "Scroll to bottom"}
            sx={{
              bgcolor: "#04385B",
              color: "#fff",
              "&:hover": { bgcolor: "#032B47" },
            }}
          >
            {atBottom ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </Fab>
        </Tooltip>
      </Stack>
    </Box>
  );
}