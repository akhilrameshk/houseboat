# SEO guide: Alleppey Mermaid Houseboats

Many Alleppey (Alappuzha) tourism sites compete for the same searches, so this project is built to rank
through **content, technical SEO and local SEO**. Below is what is already in the code and what you
(or the client) still need to do outside the code.

## 1. Already built into the website
| Area | What it does |
|---|---|
| Page titles and descriptions | Unique, keyword-focused `<title>` and meta description on every page (`lib/seo.ts`, `buildMetadata`). Boats can override them in Admin → Boat → SEO |
| 10 keyword landing pages | `/alleppey-houseboat-packages`, `/luxury-houseboat-alleppey`, `/day-cruise-alleppey`, `/overnight-houseboat-stay-alleppey`, `/alleppey-honeymoon-houseboat`, `/family-houseboat-alleppey`, `/ac-houseboat-alleppey`, `/kayaking-alleppey`, `/shikara-boat-ride-alleppey`, `/alleppey-backwater-tour` (content in `lib/seo-pages.ts`) |
| Structured data (JSON-LD) | TravelAgency + LocalBusiness, WebSite, BreadcrumbList, FAQPage, ItemList and Product (boats). Helps Google understand the business, location and services |
| Canonical URLs, Open Graph, Twitter cards | On every page, with a default share image `public/og-image.jpg` |
| `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | Generated automatically. Boats and landing pages are added to the sitemap |
| Internal linking | Footer links to every landing page; the home page links to all experiences; breadcrumbs on inner pages |
| Image SEO | Descriptive alt text, width/height set (no layout shift), Cloudinary auto format (WebP/AVIF) and sizing |
| Speed | next/image with responsive sizes, lazy loading, priority hero image, self-hosted fonts |
| Local signals | `lang="en-IN"`, geo meta tags, address, phone, map and `areaServed` in structured data |
| Mobile first | Responsive design, fast mobile menu |
| Admin tools | Per-boat SEO title/description with length counters, global extra keywords, latitude/longitude, social profiles, Google Search Console verification code |

## 2. Keywords targeted (used naturally in headings, text, alt text and links)
- **Core:** alleppey houseboat, alappuzha houseboat, alleppey houseboat booking, alleppey houseboat packages, alleppey boat house, kerala houseboat, kerala backwaters
- **Intent:** luxury houseboat alleppey, ac houseboat alleppey, alleppey day cruise, overnight houseboat alleppey, alleppey honeymoon houseboat, family houseboat alleppey
- **Activities:** alleppey kayaking, shikara boat ride alleppey, alleppey backwater tour, vembanad lake houseboat, kuttanad backwaters
- **Brand:** alleppey mermaid houseboats

Add more in **Admin → Settings → Extra keywords** (for example: "houseboat near me", "punnamada houseboat",
"kumarakom houseboat", "alleppey houseboat with food"). Do not repeat a keyword unnaturally: keyword stuffing can hurt rankings.

## 3. What to do after launch (this matters as much as the code)
1. **Google Business Profile** (most important for local ranking): create it, choose the category *Houseboat rental* or *Boat tour agency*, use the **exact same name, address and phone** as the website, add photos weekly, add services, link the website.
2. **Google Search Console**: add the site, paste the verification code in Admin → Settings, submit `https://yourdomain/sitemap.xml`.
3. **Google reviews**: ask every guest for a review using the review link (shown on the home page). Reviews are a strong ranking factor.
4. **Listings and backlinks**: Tripadvisor, Kerala Tourism / DTPC Alappuzha listings, Justdial, Facebook, Instagram, YouTube. Keep name, address and phone identical everywhere.
5. **Real content**: replace the placeholder text on the About page, write unique boat descriptions (2-3 sentences mentioning Alleppey), and upload real photos with captions like "Houseboat cruising Alleppey backwaters".
6. **Fresh content**: add new photos regularly; consider a blog (for example "Best time to visit Alleppey", "Alleppey houseboat vs shikara").
7. **Domain**: use a clear domain (for example alleppeymermaidhouseboats.com), HTTPS, and set `NEXT_PUBLIC_SITE_URL` to it.
8. **Speed**: upload photos under 8 MB (they are optimised automatically); test with PageSpeed Insights.
9. **Monitor**: Search Console (queries, pages, errors). Update titles and text for queries that already get impressions.

## 4. Important notes
- Nobody can guarantee a ranking. SEO takes weeks to months, and local competitors also work on it.
- Review the text in `lib/seo-pages.ts` so it matches the real boats and services (for example AC, meals, timings) before launch. Only claim what is true.
- Do not add fake reviews or ratings to structured data; Google penalises this.
