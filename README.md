# Alleppey Mermaid Houseboats: website and admin panel (TypeScript)

Next.js 16 (App Router) + TypeScript + MongoDB (Mongoose) + Material UI. Enquiries go to WhatsApp; only boats,
boat types, gallery photos and settings are stored. Built with strong SEO for Alleppey houseboat searches (see `docs/SEO.md`).

## Features
- **Public site:** Home, Houseboats (filter by type), Boat detail (photos, route image, enquiry), Gallery (lightbox), About Us, Contact Us, plus **10 SEO landing pages** (Alleppey houseboat packages, luxury, day cruise, overnight, honeymoon, family, AC, kayaking, shikara, backwater tour).
- Same header and footer on every page, mobile menu, floating WhatsApp / Call / scroll-to-top-bottom buttons.
- **Enquiries:** every "Enquire" button opens WhatsApp with a ready message. Nothing else is stored.
- **Admin panel** (`/admin`): boats and boat types (route image, per-boat gallery, SEO title/description), gallery manager, settings (WhatsApp, call number, Google review link, map, hero photo, social links, keywords, Search Console code), change password.
- **SEO:** metadata on every page, JSON-LD (TravelAgency, FAQ, Breadcrumb, Product, ItemList), sitemap, robots, canonical URLs, Open Graph, optimised images.

## Setup
1. Node.js 20.9+ (22 LTS recommended).
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in `MONGODB_URI`, `AUTH_SECRET` (`openssl rand -base64 48`), `CLOUDINARY_*`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (10+ characters).
4. `npm run create-admin`, then remove `ADMIN_PASSWORD` from `.env.local`.
5. `npm run dev`, open http://localhost:3000 and http://localhost:3000/admin
6. In **Admin → Settings** add the WhatsApp number (digits with country code, e.g. `919876543210`), Google review link, hero photo, latitude/longitude and social links. Then add boat types and boats.
7. Before deploying run `npm run typecheck` and `npm run build`.

`public/logo.png` is the logo, `public/og-image.jpg` is the social share image, `app/icon.png` is the favicon. Replace them to rebrand.

## Security
| Area | What is done |
|---|---|
| Login | bcrypt (cost 12), signed JWT (HS256, `jose`) in an **httpOnly, Secure, SameSite=Strict** cookie, 8-hour expiry |
| Brute force | MongoDB-backed rate limits on login, password change and uploads; timing-safe compare against a dummy hash |
| Authorization | Public APIs are GET only. Every write API calls `guardAdmin()`. Admin pages re-check on the server; `proxy.ts` is an extra layer |
| CSRF | SameSite=Strict cookie + `Origin` must match host on every write request |
| Input | Zod validation on every body, unknown fields stripped, ObjectId checks (blocks NoSQL operator injection), size limits |
| Uploads | JPG/PNG/WebP only, 8 MB max, real file signature checked, stored on Cloudinary, URLs restricted to `https://res.cloudinary.com/` |
| Headers | CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy (`next.config.ts`); admin is `noindex` |

Also: HTTPS, Cloudflare (free) in front, least-privilege MongoDB user, Atlas IP allow-list, backups, `npm audit`.
If the app is not behind Cloudflare or nginx that sets `x-forwarded-for`, IP rate limiting can be spoofed.

## Deploy
- **VPS:** `npm run build`, run `npm start` under pm2, nginx reverse proxy to port 3000, SSL with certbot.
- **Vercel or similar:** add the same environment variables in the project settings.

## Notes
- Written for Next.js 16 and MUI 7. Next.js 16 uses `proxy.ts`; on Next.js 15 rename it to `middleware.ts` and the function to `middleware`.
- `components/ThemeRegistry.tsx` imports `@mui/material-nextjs/v15-appRouter` (the entry shown in the MUI docs). If your version has `v16-appRouter`, switch the import.
- Pages read the database on every request (`dynamic = "force-dynamic"`), so the site always shows the latest data and builds without a database.
- Mongoose models are loosely typed (`Model<any>`); data shapes are typed through the DTOs in `types/index.ts`.
- This project was type-checked only partially in the authoring environment (no network to install packages). Run `npm run typecheck` and `npm run build` after `npm install` and fix any reported type errors.
- Review the landing-page text in `lib/seo-pages.ts` and the About page so it matches the real business.

## Structure
```
app/(site)/…   public pages and SEO landing pages     app/admin/…    admin pages
app/api/…      REST API routes                         components/…   UI components
lib/…          auth, db, validation, SEO, JSON-LD      models/…       Mongoose models
types/…        shared TypeScript types                 proxy.ts       first-layer admin guard
docs/SEO.md    SEO guide                               scripts/create-admin.ts
```
