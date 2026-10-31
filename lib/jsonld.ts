import type { BoatDTO, FaqItem, SettingsDTO } from "@/types";
import { AREAS_SERVED, BASE_KEYWORDS, SITE_NAME, absoluteUrl, mergeKeywords } from "@/lib/seo";
import { cdn } from "@/lib/cdn";

export type LD = Record<string, unknown>;

export function businessLd(s: SettingsDTO): LD {
  const sameAs = [s.instagramUrl, s.facebookUrl, s.youtubeUrl, s.tripadvisorUrl].filter(Boolean);
  const ld: LD = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": absoluteUrl("/#business"),
    name: s.siteName || SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: s.heroImage ? cdn(s.heroImage, 1200) : absoluteUrl("/og-image.jpg"),
    description:
      "Houseboat day cruises, overnight stays, kayaking and shikara boat rides on the Alleppey (Alappuzha) backwaters of Kerala. Enquire on WhatsApp.",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address,
      addressLocality: "Alappuzha",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name })),
    knowsAbout: mergeKeywords(BASE_KEYWORDS, s.extraKeywords),
  };
  if (s.email) ld.email = s.email;
  if (s.callNumber || s.whatsappNumber) ld.telephone = `+${s.callNumber || s.whatsappNumber}`;
  if (sameAs.length) ld.sameAs = sameAs;
  if (s.latitude && s.longitude) {
    ld.geo = { "@type": "GeoCoordinates", latitude: Number(s.latitude), longitude: Number(s.longitude) };
  }
  if (s.googleMapsUrl) ld.hasMap = s.googleMapsUrl;
  return ld;
}

export function websiteLd(s: SettingsDTO): LD {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: s.siteName || SITE_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": absoluteUrl("/#business") },
  };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>): LD {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqLd(faqs: FaqItem[]): LD {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function boatLd(boat: BoatDTO, typeName: string, s: SettingsDTO): LD {
  const ld: LD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: boat.name,
    url: absoluteUrl(`/houseboats/${boat.slug}`),
    category: `${typeName} in Alleppey, Kerala`,
    description: boat.description || `${boat.name}: ${typeName.toLowerCase()} in Alleppey (Alappuzha), Kerala.`,
    image: boat.images.map((i) => cdn(i.url, 1200)),
    brand: { "@type": "Brand", name: s.siteName || SITE_NAME },
  };
  if (boat.price != null) {
    ld.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: boat.price,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/houseboats/${boat.slug}`),
    };
  }
  return ld;
}

export function itemListLd(boats: BoatDTO[]): LD {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: boats.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/houseboats/${b.slug}`),
      name: b.name,
    })),
  };
}
