# Asmau Ayub — Portfolio & Admin CMS

Personal/academic portfolio for Asmau Ayub (Licensed Counseling Psychologist, PhD candidate at Michigan State University), with a password-protected admin area for managing awards, research, community service, supervision, speaking engagements, blog posts, media and contact messages.

Originally scaffolded with v0.dev, then developed by hand. v0 sync is no longer used.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 3, shadcn/ui (Radix), lucide-react, framer-motion |
| Data fetching / state | `@supabase/supabase-js`, TanStack React Query, Zustand |
| Rich text | Froala Editor (admin blog/research forms) |
| Backend | **Supabase** (Postgres + Auth + Storage). There is no separate backend server. |
| Hosting | **Vercel** |

---

## Where things live

### Vercel
- **Team:** `eugenedevs-projects` · **Project:** `asmau-ayub`
- **URLs:** https://aaport.vercel.app (working). The custom domain `asmauayub.com` **no longer resolves** (see [Known issues](#known-issues)).
- Production deploys automatically on every push to `main`.
- Build settings: Next.js preset, install command `npm i --force` (needed because of peer-dependency conflicts), Node 22.
- **Cron:** `vercel.json` calls `/api/keepalive` daily at 09:00 UTC (see below).

### Supabase
- **Project:** `asmau` · ref `eqjzelrncithribtxzvn` · region us-east-2 · Postgres 15 · **Free plan**
- Dashboard: https://supabase.com/dashboard/project/eqjzelrncithribtxzvn
- ⚠️ Free projects are **paused after ~7 days without activity**. The project was paused from Jul 2025 to Nov 2026, and the site showed no data during that time. The daily keep-alive cron exists to prevent this. If it ever stops, resume the project from the dashboard.
- The free plan has **no downloadable backups**. Take your own with `pg_dump` (see [Backups](#backups)).

### Environment variables

Set in Vercel (Production, Preview and Development). All three are marked *sensitive*, so `vercel env pull` will **not** return their values. Copy them from Supabase → Project Settings → API.

| Variable | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | browser + server | `https://eqjzelrncithribtxzvn.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server | Public key. All browser queries go through RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | `app/api/contact/route.ts` only | **Secret.** Bypasses RLS. Never expose it to the client. |

---

## How the backend works

There is almost no server code. The browser talks to Supabase directly, and **Row Level Security (RLS) policies in Postgres decide who can read and write what.**

```
Browser ──(anon key / user JWT)──▶ Supabase REST + Auth + Storage
   │                                     ▲
   └──▶ Next.js API routes ──(service role)──┘   (contact form only)
```

- **Client:** `lib/supabase.ts` creates one shared client. Data access is wrapped in hooks (`hooks/use*.ts`) and two Zustand stores (`store/`).
- **Auth:** Supabase email/password plus Google OAuth (`hooks/useAuth.ts`). Forgot/reset-password uses Supabase's email flow.
- **Admin protection:** `app/admin/layout.tsx` redirects to `/admin/login` when there is no session. This check runs only in the browser; the real protection is RLS.
- **API routes:**

| Route | Purpose |
|---|---|
| `POST /api/contact` | Saves contact-form messages into `contact_messages` using the service role key |
| `GET /api/keepalive` | Runs a tiny `select` on `categories` so Supabase sees activity. Called by Vercel Cron. |
| `GET /api/test-add-presentation` | Leftover test route that inserts a dummy row. **Should be deleted.** |

### Database tables (`public` schema)

The authoritative schema is **`supabase/schema.sql`**, dumped from production on 2026-11-12 (tables, RLS policies, functions and triggers). The older files in `scripts/`, `migrations/` and `supabase/setup.sql` are incomplete and partly out of date. Don't use them to rebuild the database.

| Table | Used by |
|---|---|
| `awards` | `/awards`, admin → Awards |
| `community_projects` | `/professional-leadership/community-service`, admin → Community Service |
| `research_works`, `research_articles`, `research_books`, `research_presentations`, `research_categories` | `/research`, admin → Research |
| `supervisions`, `speaking_engagements` | admin → Professional Leadership |
| `contents`, `categories` | Blog posts and categories |
| `contact_messages` | Contact form → admin → Contacts |
| `media` | admin → Media library |
| `contact_submissions`, `cv_requests` | Created by the old setup script, **not used** by the code |

### Storage buckets
`assets` (public) and `media` (public) hold uploaded images. `publications` and `avatars` exist but are empty.

### Admin accounts
There are three Supabase Auth users (the developer, a second developer account, and Asmau's own account). Manage them in Supabase → Authentication → Users.

---

## Running locally

Requirements: Node 20+, Docker (Docker Desktop or OrbStack), and network access for `npx`.

### Option A: against a local copy of the database (recommended)

This runs a full local Supabase (Postgres, Auth, REST, Storage, Studio) in Docker, so you can't damage production data.

```bash
npm i --force
npx supabase start            # first run pulls images (~5–10 min); config in supabase/config.toml (Postgres 15)
```

`supabase start` prints the local URLs and keys. Put these in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ANON_KEY printed by supabase start>
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY printed by supabase start>
```

Restore a production dump (see [Backups](#backups) for how to make one). **Order matters:** load auth before public data, because some tables reference `auth.users`.

```bash
L=postgresql://postgres:postgres@127.0.0.1:54322/postgres
psql "$L" -f schema_public.sql          # tables + RLS ("schema public already exists" error is harmless)
psql "$L" -f data_auth_storage.sql      # users + buckets (errors on *migrations* / vector tables are harmless)
psql "$L" -f data_public.sql            # site data
```

Storage files aren't part of `pg_dump`. Upload them to the local buckets via the Storage API, using the service role key and `x-upsert: true`. Rows that store full image URLs (`community_projects.image_url`, `research_presentations.featured_image`) point at production storage. Rewrite them to `http://127.0.0.1:54321` if you want everything local.

```bash
npm run dev                   # http://localhost:3000
```

| Local service | URL |
|---|---|
| Supabase Studio (tables, SQL, users) | http://127.0.0.1:54323 |
| Mail catcher (password-reset emails land here) | http://127.0.0.1:54324 |
| Postgres | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

Stop with `npx supabase stop` (data is kept). `npx supabase db reset` **wipes** the local database.

### Option B: against production

Put the three production values from Supabase → Settings → API into `.env.local` and run `npm run dev`. **Anything you create, edit or delete in the admin area changes the live site.**

---

## Backups

The free plan has no dashboard backups. Take one with `pg_dump`. Supabase runs Postgres 15, so you need `pg_dump` 15 or newer (the Docker image works).

Use the **session pooler** connection string (Supabase → Connect → Session pooler). The direct `db.<ref>.supabase.co` host is IPv6-only and fails on many networks:

```bash
DB='postgresql://postgres.eqjzelrncithribtxzvn:<DB_PASSWORD>@aws-0-us-east-2.pooler.supabase.com:5432/postgres'
docker run --rm -e DB="$DB" -v "$PWD/backup":/out postgres:15 sh -c '
  pg_dump "$DB" --schema=public --schema-only --no-owner --no-privileges -f /out/schema_public.sql &&
  pg_dump "$DB" --schema=public --data-only  --no-owner -f /out/data_public.sql &&
  pg_dump "$DB" --schema=auth --schema=storage --data-only --no-owner -f /out/data_auth_storage.sql &&
  pg_dump "$DB" -Fc --no-owner -f /out/full.dump'
```

Download storage files separately (both image buckets are public: `/storage/v1/object/public/<bucket>/<path>`).

**Never commit dumps to this repo.** They contain password hashes and visitors' contact messages. `*.sql` is gitignored, except `supabase/schema.sql`, which holds structure only. The latest full backup (2026-11-12) is kept outside the repo by the current maintainer. Ask for it during handover.

---

## Known issues

| Issue | Where | Notes |
|---|---|---|
| `asmauayub.com` doesn't resolve | DNS / registrar | Domain probably lapsed. Renew it, or remove it from Vercel. Site metadata still points to it (`app/layout.tsx`). |
| Password-reset emails link to the dead domain | Supabase → Auth → URL Configuration | Set **Site URL** to the working production URL and add `http://localhost:3000/**` to Redirect URLs. |
| **Request CV form is fake** | `app/contact/request-cv/page.tsx` | Shows "Request Sent" but saves nothing (`setTimeout` placeholder). Requests are lost. |
| **Newsletter signup is fake** | `components/footer.tsx` | Same placeholder; nothing is stored. |
| `/awards` is statically rendered | `app/awards/page.tsx` | Award data is baked in at build time, so admin changes only show after the next deploy. Add `export const revalidate = 60` to fix. |
| Public test route can insert rows | `app/api/test-add-presentation` | Delete it. |
| Test data visible on the public site | `research_presentations` | Two rows titled "Test" / "Test 2". |
| Anyone may be able to sign up | Supabase → Auth → Providers | RLS gives *any* logged-in user write access. Disable new sign-ups so only existing admins can log in. |
| `/new`, `app/pagee.tsx`, `pagen.tsx`, `pagenew.tsx` | `app/` | Old drafts. `/new` throws hydration errors. Safe to delete. |
| Build ignores TS/ESLint errors | `next.config.mjs` | `ignoreBuildErrors: true`, so broken code can still deploy. |
| Empty-state missing | `/research` Articles & Books tabs | The tabs render blank when there's no data. |
| Next.js security updates | `package.json` | Vercel **refuses to deploy** vulnerable Next.js versions (this happened in Nov 2026; fixed by moving 15.2.4 → 15.2.9). Keep `next` patched. |

---

## Handover checklist

- [ ] Add the new developer to the Vercel team `eugenedevs-projects` (or transfer the `asmau-ayub` project).
- [ ] Invite them to the Supabase org that owns `asmau` (or transfer the project).
- [ ] Add them as a collaborator on this GitHub repo.
- [ ] Hand over the latest backup through a secure channel, not email or chat.
- [ ] Rotate the Supabase database password and the service role key after handover, and update Vercel env vars.
- [ ] Decide what to do about the `asmauayub.com` domain.
- [ ] Confirm the daily keep-alive is running: Vercel → Project → Settings → Cron Jobs, and `curl https://aaport.vercel.app/api/keepalive` should return `{"ok":true,...}`.
