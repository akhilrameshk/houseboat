import Image from "next/image";
import { Box } from "@mui/material";

type ResponsiveHeight = number | { xs?: number; sm?: number; md?: number; lg?: number };

interface LogoProps {
  height?: ResponsiveHeight;
  alt?: string;
  priority?: boolean;
}

export default function Logo({
  height = 70,
  alt = "Alleppey Mermaid Houseboats logo",
  priority = false,
}: LogoProps) {
  const naturalWidth = 700;
  const naturalHeight = 508;

  return (
    <Box
      sx={{
        display: "inline-block",
        height: height,
        width: "auto",
        "& img": {
          height: "100%",
          width: "auto",
          objectFit: "contain",
        },
      }}
    >
      <Image
        src="/logo.png"
        alt={alt}
        width={naturalWidth}
        height={naturalHeight}
        priority={priority}
        unoptimized
        style={{ display: "block", width: "auto", height: "100%" }}
      />
    </Box>
  );
}