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

## Reviews setup

Reviews are stored in Supabase as `pending` first. The owner receives a Resend email with a link to `/admin/reviews?token=...`, where reviews can be approved or rejected.

1. Create the Supabase table using `supabase/reviews.sql`.
2. Add these variables to `.env.local`:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_REVIEWS_TABLE=reviews
REVIEW_ADMIN_TOKEN=
```

Use a long random value for `REVIEW_ADMIN_TOKEN`.

## Sections included

- Navbar
- Home / Hero
- Services
- About Us
- Portfolio
- Reviews with moderation workflow
- Contact form with Resend API route
- Generated local SVG image assets in `public/images`
# dras-remodeling-site
