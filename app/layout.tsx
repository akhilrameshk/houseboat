import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import { BASE_KEYWORDS, DEFAULT_OG, SITE_NAME, siteUrl } from "@/lib/seo";

const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const head = Playfair_Display({ subsets: ["latin"], variable: "--font-head", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} | Luxury Houseboat Tours in Alleppey, Kerala`, template: `%s | ${SITE_NAME}` },
  description:
    "Alleppey houseboat day cruises, overnight stays, kayaking and shikara boat rides on the Kerala backwaters. AC and non-AC houseboats. Enquire on WhatsApp.",
  applicationName: SITE_NAME,
  keywords: BASE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "travel",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: `${SITE_NAME} - houseboats in Alleppey` }],
  },
  twitter: { card: "summary_large_image", images: [DEFAULT_OG] },
  other: { "geo.region": "IN-KL", "geo.placename": "Alappuzha", "geo.position": "9.4981;76.3388", ICBM: "9.4981, 76.3388" },
};

export const viewport: Viewport = {
  themeColor: "#04385B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${body.variable} ${head.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
