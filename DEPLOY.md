# Deploy guide

How to put this site on any host, connect any domain, and (if needed) use a different Supabase project.

The site is a standard Next.js app. It needs only **3 environment variables** and nothing else.

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page → `anon` / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page → `service_role` / secret key. **Keep it secret.** |
| `NEXT_PUBLIC_SITE_URL` *(optional)* | Your domain, e.g. `https://example.com`. Used for link previews on social media. |

---

## A. Deploy to a new platform

Works on Vercel, Netlify, Render, Railway, or any server with Node 20+.

1. **Import the GitHub repo** on the platform. It detects Next.js automatically.
   Leave the defaults: build `npm run build`, start `npm start`. (`.npmrc` already handles the install quirks.)
2. **Add the environment variables** from the table above.
3. **Deploy.** Open the site, then log in at `/admin/login` to check the admin works.

**Keep Supabase awake (free plan only).** A free Supabase project pauses after 7 days of no traffic, and the site then shows no data.
- On **Vercel** this is automatic (`vercel.json` pings the site daily).
- On **any other host**, create a free job at [cron-job.org](https://cron-job.org) that opens `https://YOUR-DOMAIN/api/keepalive` once a day.

Running your own server instead? `npm install && npm run build && npm start` (port 3000).

---

## B. Use a new domain

1. **Add the domain on your hosting platform** (e.g. Vercel → Project → Settings → Domains) and create the DNS records it shows you at your domain registrar.
2. **Tell Supabase the new address.** Supabase → Authentication → URL Configuration:
   - **Site URL:** `https://your-domain.com`
   - **Redirect URLs:** add `https://your-domain.com/**`

   Without this, password-reset emails link to the old address.
3. **Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com`** on the hosting platform, then redeploy.

Nothing in the code needs changing.

---

## C. Use a different Supabase project (optional)

Skip this if you are keeping the current Supabase project.

You need a backup of the current project (`schema_public.sql`, `data_public.sql`, `auth_users.sql`, `storage/`). The previous developer has one; take a fresh one right before moving (README → Backups) so nothing is lost. You also need [`psql`](https://www.postgresql.org/download/).

1. **Create the project** at [supabase.com](https://supabase.com). Copy its database connection string from **Connect → Session pooler**:
   ```bash
   NEW='postgresql://postgres.NEWREF:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres'
   ```

2. **Build the tables** (run from the repo folder):
   ```bash
   psql "$NEW" -f supabase/schema.sql          # "schema public already exists" error is harmless
   for f in supabase/migrations/*.sql; do psql "$NEW" -f "$f"; done
   ```

3. **Copy the admin logins, then the content** (run from the backup folder, in this order). Image links inside the data point at the old project, so the `sed` swaps the old project ref for the new one:
   ```bash
   psql "$NEW" -f auth_users.sql
   sed 's/eqjzelrncithribtxzvn/NEWREF/g' data_public.sql > data_new.sql
   psql "$NEW" -f data_new.sql
   ```
   Then upload the images: Supabase → Storage → open the `assets` bucket and drag in the **contents** of `storage/assets/`. Do the same for `media`. Keep the folder structure as it is.

4. **Lock sign-ups.** Authentication → Sign In / Providers → uncheck **Allow new users to sign up**.
   Existing admins log in with the passwords they had when the backup was taken. If one fails, use **Forgot password** on `/admin/login`.

5. **Update the 3 environment variables** on the hosting platform with the new project's values, do step B.2 for the new project, and redeploy.

---

## Quick check after any change

- [ ] Home page, Research, Awards and Blog show content and images
- [ ] `/admin/login` works
- [ ] Contact form message appears in Admin → Contacts
- [ ] `https://YOUR-DOMAIN/api/keepalive` returns `{"ok":true,...}`

More detail (how the code works, local development, backups): see [README.md](README.md).
