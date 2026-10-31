import type { LD } from "@/lib/jsonld";

// Renders schema.org structured data. "<" is escaped so the JSON can never close the script tag.
export default function JsonLd({ data }: { data: LD | LD[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
