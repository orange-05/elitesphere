# Elitesphere Consultancy

Marketing website for **Elitesphere Consultancy** — a strategic consulting firm offering digital marketing, branding, website development, business consulting, and educational-institution services.

Built as a static React single-page app, deployed to **GitHub Pages**.

🌐 **Live site:** https://orange-05.github.io/elitesphere/

---

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (build / dev server)
- **Tailwind CSS 4** (utility-first styling)
- **Framer Motion** (animations)
- **Lucide React** (icon set)
- **Supabase** (optional contact-form persistence — no-op when not configured)

The Express server in `server.js` and the `Dockerfile` exist for self-hosting only;
GitHub Pages deploys the static `dist/` folder directly.

---

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script             | Purpose                                                 |
|--------------------|---------------------------------------------------------|
| `npm run dev`      | Vite dev server with HMR on port 3000                   |
| `npm run build`    | Production build into `dist/`                           |
| `npm run preview`  | Serve the production `dist/` locally                    |
| `npm run start`    | Express production server (Docker / self-host only)     |
| `npm run lint`     | TypeScript type-check (`tsc --noEmit`)                  |
| `npm run clean`    | Delete the `dist/` folder                               |

---

## Project structure

```
src/
├── App.tsx                  # Main app shell + virtual router + all page sections
├── main.tsx                 # React root
├── index.css                # Tailwind v4 entry + theme tokens
├── types.ts                 # Shared TypeScript interfaces
├── components/
│   ├── BlogSection.tsx      # Blog grid + detail modal + newsletter form
│   ├── ClientPortal.tsx     # Client portal demo (auth + project dashboard)
│   └── ElitesphereLogo.tsx  # Inline SVG logo
├── data/
│   ├── servicesData.ts      # 5 services + 7 industries
│   └── blogData.ts          # 5 hardcoded blog posts
└── utils/
    ├── storage.ts           # LocalStorage helpers (state + inquiries + newsletter)
    └── supabase.ts          # Optional Supabase remote persistence (lazy-loaded)
```

---

## Environment variables

Copy `.env.example` to `.env` and fill in real values:

| Variable                   | Required for        | Purpose                                       |
|----------------------------|---------------------|-----------------------------------------------|
| `VITE_SUPABASE_URL`        | Contact-form sync   | Supabase project URL                          |
| `VITE_SUPABASE_ANON_KEY`   | Contact-form sync   | Supabase anon public key                      |

When **neither** is set, the contact form behaves as a local-only demo
(rows are written to `localStorage`). The marketing UI never depends on
the backend being configured.

### Setting up Supabase (optional, ~3 minutes)

1. Create a free project at https://supabase.com.
2. In the SQL editor, run:

   ```sql
   create table if not exists public.inquiries (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     full_name text not null,
     company_name text,
     email_address text not null,
     phone_number text,
     service_interested_in text,
     message text not null,
     status text not null default 'new'
   );

   create table if not exists public.newsletter_subscribers (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     email_address text not null unique
   );

   -- Open read access to authenticated users only (you, in Supabase Studio).
   alter table public.inquiries enable row level security;
   alter table public.newsletter_subscribers enable row level security;

   -- Anyone can submit; nobody can read via the anon key.
   create policy "anon can insert inquiries"
     on public.inquiries for insert to anon with check (true);

   create policy "anon can insert newsletter"
     on public.newsletter_subscribers for insert to anon with check (true);
   ```

3. Copy your project URL and anon key into `.env`.
4. To also receive an email per inquiry, set up a **Database Webhook** in
   Supabase → Database → Webhooks that fires on `inquiries` inserts and
   POSTs to Resend / SendGrid / Postmark / your own endpoint.

---

## Deployment

Pushes to `master` (or to the `deploy/v2-live` branch) trigger
`.github/workflows/deploy.yml`, which:

1. Installs deps (`npm ci`)
2. Builds (`npm run build`)
3. Publishes `dist/` to the `gh-pages` branch via
   [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

The site is served at **https://orange-05.github.io/elitesphere/**.

To set up GitHub Pages the first time:

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch** → `gh-pages` → `/ (root)`
3. (Optional) Add a custom domain in the **Custom domain** field and
   configure DNS accordingly.

---

## What the public site includes

- Hero, About, Services, Why-Choose-Us, Process Timeline, Industries, CTA
- Insights / Blog with search, category filter, and detail modal
- Founder's Message page
- Contact form (persists locally + optionally to Supabase)
- Newsletter signup
- Client Portal demo (`/portal` — see "Demo credentials" below)

### Demo credentials (Client Portal)

> ⚠️ The portal is a **demonstration only**. All data lives in your browser's
> `localStorage` and is visible to anyone with browser dev-tools access. The
> hard-coded admin credentials are deliberately weak for demo purposes —
> do not publish real client data through this UI.

| Role   | Email                          | Password   |
|--------|--------------------------------|------------|
| Client | `client@elitesphere.com`       | `client123`|
| Admin  | `admin@elitesphere.com`        | `admin123` |

Any other email + password ≥ 4 chars creates a throwaway "virtual account".

---

## License

Proprietary © Elitesphere Consultancy. All rights reserved.