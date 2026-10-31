"use client";

import Link from "next/link";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export interface Crumb {
  name: string;
  path: string;
}

// Visible breadcrumb trail plus BreadcrumbList structured data. "Home" is added automatically.
export default function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  const color = light ? "#CFE3EA" : "text.secondary";
  
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <MuiBreadcrumbs aria-label="Breadcrumb" sx={{ mb: 1.5, "& .MuiBreadcrumbs-separator": { color } }}>
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <Typography key={c.path} variant="body2" sx={{ color: light ? "#fff" : "text.primary", fontWeight: 600 }}>
              {c.name}
            </Typography>
          ) : (
            <Typography key={c.path} component={Link} href={c.path} variant="body2" sx={{ color, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              {c.name}
            </Typography>
          )
        )}
      </MuiBreadcrumbs>
    </>
  );
}