import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import { getSettings } from "@/lib/settings";
import { businessLd, websiteLd } from "@/lib/jsonld";
import { BASE_KEYWORDS, mergeKeywords } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    keywords: mergeKeywords(BASE_KEYWORDS, s.extraKeywords),
    verification: s.googleVerification ? { google: s.googleVerification } : undefined,
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={[businessLd(settings), websiteLd(settings)]} />
      <SiteHeader siteName={settings.siteName} whatsapp={settings.whatsappNumber} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} />
      <FloatingButtons whatsapp={settings.whatsappNumber} phone={settings.callNumber || settings.whatsappNumber} />
    </>
  );
}
