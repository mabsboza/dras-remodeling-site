# DRAS Remodeling Website

Next.js + TypeScript + Tailwind + Resend template inspired by the attached design.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Resend setup

Add your Resend API key and destination email to `.env.local`.
For production, replace `CONTACT_FROM_EMAIL` with a verified domain email in Resend.

## Sections included

- Navbar
- Home / Hero
- Services
- About Us
- Portfolio
- Contact form with Resend API route
- Generated local SVG image assets in `public/images`
# dras-remodeling-site
