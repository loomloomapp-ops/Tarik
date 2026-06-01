# TARIK Invest s.r.o. — Website

Bilingual (Czech default / Ukrainian) corporate lead-generation site for professional
electrical installation works across the Czech Republic.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (i18n routing, `cs` without prefix, `uk` under `/uk`)
- Framer Motion (scroll reveals, header, popup)
- Geist Sans / Geist Mono
- Zod (server-side validation)

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
npm run lint
```

## Project map
- `src/app/[locale]/` — pages (home, privacy), root layout, SEO metadata
- `src/app/api/lead` · `src/app/api/career` — form endpoints (validated, rate-limited)
- `src/components/sections/` — Hero, TrustStrip, Services, Process, Projects, Advantages, LeadFormSection, Testimonials, Careers, Faq, FinalCta
- `src/components/conversion/` — popup, sticky mobile CTA, desktop widget
- `src/components/forms/` — Lead / Popup / Career forms + shared fields
- `messages/cs.json` · `messages/uk.json` — all copy (single source of truth)
- `src/content/` — company facts, media (image) references

## Lead delivery (currently stubbed)
The API routes are fully working stubs: they validate input, guard against spam
(honeypot + rate limit) and log the payload server-side. To go live:

1. `npm i resend googleapis`
2. Copy `.env.local.example` to `.env.local` and fill the keys.
3. Uncomment the reference implementations in
   `src/lib/integrations/email.ts` and `src/lib/integrations/sheets.ts`.

Email target: `tarikinvest009@gmail.com`. Sheets tabs: `Leads`, `Careers`.

## Placeholders to replace before launch
- `public/logo.png` — supplied brand logo (already in place).
- `public/og-image.jpg` — add a 1200×630 social share image (referenced in metadata).
- Project + hero imagery — `src/content/media.ts` uses `picsum.photos` seeds; swap for real photography.
- Social links — `src/content/company.ts` (`#` placeholders).
- Privacy policy text — `messages/*.json` `privacy.*` is a draft; have a lawyer review.
- Domain — set `NEXT_PUBLIC_SITE_URL` (defaults to `https://tarikinvest.cz`).
