import type { ReactNode } from "react";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import JsonLd from "@/components/JsonLd";
import { getSettings } from "@/lib/settings";
import { breadcrumbLd } from "@/lib/jsonld";
import { cdn } from "@/lib/cdn";

export interface HeroCrumb {
  name: string;
  path: string;
}

interface HeroProps {
  title: string; // page <h1>
  eyebrow?: string; // small line above the title
  subtitle?: string;
  crumbs?: HeroCrumb[]; // inner pages ("Home" is added automatically)
  size?: "large" | "compact"; // large = home page, compact = inner pages
  children?: ReactNode; // e.g. <HeroActions /> buttons under the subtitle
}

const HERO_CSS = `
  @keyframes fadeInSlide {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes globalWaPulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0.7); }
    70% { box-shadow: 0 0 0 16px rgba(0, 168, 89, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0); }
  }
  @keyframes waveMove1 {
    0% { transform: translateX(0); }
    50% { transform: translateX(-25%); }
    100% { transform: translateX(0); }
  }
  @keyframes waveMove2 {
    0% { transform: translateX(0); }
    50% { transform: translateX(-15%); }
    100% { transform: translateX(0); }
  }
  .hero-content { animation: fadeInSlide 0.8s ease-out forwards; }
  .tempting-whatsapp { animation: globalWaPulse 2.2s infinite ease-in-out; }
  .wave-layer-1 { animation: waveMove1 12s ease-in-out infinite; }
  .wave-layer-2 { animation: waveMove2 8s ease-in-out infinite reverse; }
`;

// Common hero: sunset background, dark overlay, animated waves.
// Home page: <Hero size="large" ...>. Inner pages: <Hero title="Gallery" crumbs={[...]} />.
// The photo comes from Admin -> Settings (hero photo), or /hero.webp when none is set.
export default async function Hero({ title, eyebrow, subtitle, crumbs = [], size = "compact", children }: HeroProps) {
  const settings = await getSettings();
  const bg = settings.heroImage ? cdn(settings.heroImage, 1920) : "/hero.webp";
  const large = size === "large";
  const all: HeroCrumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        color: "#fff",
        minHeight: large ? { xs: 580, md: 580 } : { xs: 270, md: 270 },
        display: "flex",
        alignItems: "center",
         backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: 0,
        },
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      <Container maxWidth="lg" sx={{ position: "relative", py: large ? 10 : { xs: 5, md: 7 }, zIndex: 1 }}>
        <Box className="hero-content" sx={{ maxWidth: large ? 640 : 760 }}>
          {crumbs.length > 0 && (
            <>
              <JsonLd data={breadcrumbLd(all)} />
              <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: 1.5, "& .MuiBreadcrumbs-separator": { color: "#CFE3EA" } }}>
                {all.map((c, i) =>
                  i === all.length - 1 ? (
                    <Typography key={c.path} variant="body2" sx={{ fontWeight: 600, color: "#fff" }}>
                      {c.name}
                    </Typography>
                  ) : (
                    <Typography
                      key={c.path}
                      component="a"
                      href={c.path}
                      variant="body2"
                      sx={{ color: "#CFE3EA", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      {c.name}
                    </Typography>
                  )
                )}
              </Breadcrumbs>
            </>
          )}

          {eyebrow && (
            <Typography component="p" sx={{ letterSpacing: ".18em", fontWeight: 700, fontSize: 12, color: "#FDE7B0", mb: 1.5, textTransform: "uppercase" }}>
              {eyebrow}
            </Typography>
          )}

          <Typography
            variant="h1"
            sx={{
              fontFamily: "serif",
              fontSize: large ? { xs: 38, md: 54 } : { xs: 32, md: 44 },
              fontWeight: 700,
              lineHeight: 1.1,
              mb: subtitle || children ? 2.5 : 0,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography sx={{ fontSize: 16, maxWidth: 480, lineHeight: 1.6, color: "#E0ECF3", mb: children ? 4 : 0 }}>
              {subtitle}
            </Typography>
          )}

          {children}
        </Box>
      </Container>

      {/* Animated multi-layer waving divider */}
      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, overflow: "hidden", zIndex: 1, pointerEvents: "none" }}>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
          style={{ width: "100%", height: large ? "30px" : "26px" }}
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="wave-layer-2" style={{ opacity: 0.3 }}>
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="#F8F9FA" />
          </g>
          <g className="wave-layer-1" style={{ opacity: 0.7 }}>
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#F8F9FA" />
          </g>
          <g>
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="#F8F9FA" />
          </g>
        </svg>
      </Box>
    </Box>
  );
}