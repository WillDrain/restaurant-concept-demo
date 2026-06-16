# Tide & Table — Restaurant Site + Reservation System

A mock restaurant website template with a working, low-cost reservation system built for independent restaurants. This isn't a static mockup. It's a real full-stack app: bookings get validated, saved to a live Postgres database, and read back out on a dedicated page.

**Live demo:** [restaurant-concept-demo.vercel.app](https://restaurant-concept-demo.vercel.app)

> **Note:** This is a template, not a finished site for one specific restaurant. The images are intentional placeholders. In a real client build, they'd be swapped for that restaurant's own photography, menu, and branding. What's *real* and fully working is the engine underneath: the reservation system, validation, database, and live deploy. The template is the part you customize per client. The engine is the part that's done.

### Viewing the reservations admin

The `/reservations` page is the admin view. It reads every booking back out of the live database. Because it exposes booking data, I put it behind a login (HTTP Basic Auth), the same way you'd gate a real back-office page. Use the demo credentials to get in:

- **URL:** [restaurant-concept-demo.vercel.app/reservations](https://restaurant-concept-demo.vercel.app/reservations)
- **Username:** `admin`
- **Password:** `demo-tide-table-2026`

> The bookings you'll see are **seeded demo data**: made-up names, `example.com` emails, and `555-01xx` phone numbers, not real reservations. The password is published here on purpose, because the whole point of a demo is to let people look inside. The auth itself is real (proper server-side check before the page ever renders). In a real deployment, that password becomes a private, rotated secret and the same code is doing real work.

---

## Why I built this

I built this because of my own experience in the restaurant industry. I spent nine years in restaurants before I wrote a line of production code, and I kept seeing the same thing: small, family-owned places overpaying for websites and booking software. Bloated tools priced for chains, sold to restaurants that just need the basics to work.

So I decided to build one myself. Something a small restaurant can actually afford, made by someone who's worked the floor and knows what they need instead of guessing from the outside. This is the working proof of that idea, and the first step toward pitching it to local restaurants for real.

## What it does

- **Book a Table form.** A guest submits their name, contact, party size, and date. The input gets validated, saved to the database, and confirmed.
- **Server-side validation.** Every submission is checked with Zod on the server before anything touches the database. Bad input gets a clear error instead of a crash.
- **Reservations view (`/reservations`).** Reads every booking back out of the database, newest first. It's gated behind an admin login (Basic Auth), like a real back-office page, with demo credentials listed above. The backend isn't just an endpoint you take on faith. You can log in and watch it work.
- **Live in production.** Deployed on Vercel against a hosted Neon Postgres database. The form you click writes a real row.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Prisma** ORM + **Neon** (serverless Postgres)
- **Zod** for runtime validation
- **Vercel** for hosting and CI deploys

## Technical decisions I can defend

I don't ship code I can't explain. Before every commit on this project, I have to explain the concept behind it in my own words. If I can't, I stop and learn it first. A few of the decisions in this repo, and *why* they're built the way they are:

- **The API route is a trust boundary, not a formality.** The browser can't talk to the database directly, because the database credentials live server-side. The booking form POSTs to an API route that validates the request with Zod and is the only thing that talks to the DB. The form runs in the browser, on the wrong side of that line, so it has to go through the route.
- **`/reservations` is a Server Component with no API route, on purpose.** The read path is the write path in reverse. A Server Component already runs on the side that can reach the database, so it queries Prisma directly and ships finished HTML. No extra endpoint needed. Same boundary, opposite direction.
- **Two database URLs (pooled and direct) because serverless changes the rules.** Serverless functions can spin up many instances at once. If each one opened its own direct DB connection, they'd blow past the connection limit. So runtime queries go through a pooled connection (`DATABASE_URL`), while Prisma migrations use a direct one (`DIRECT_URL`) for the stable session they need.
- **`/reservations` uses dynamic rendering, not the static default.** Most pages get cached as a snapshot at build time. Fast, but frozen. A reservations list can't be frozen at deploy time, or new bookings would be invisible until the next deploy. `force-dynamic` makes it run fresh on every request so it always reflects the live database.
- **The admin page is gated in `proxy.ts`, before the page renders.** Auth runs as a Next.js proxy (the convention formerly called middleware) that intercepts requests to `/reservations` first. If the credentials don't check out, it returns a 401 and the page code never runs, so the booking data never leaves the server. Real protection happens before render, not after.

## How I learn (Explain-to-Ship)

This repo has a `LEARNING.md` at the root. Every concept I hit on this project, I write back in my own words before I'm allowed to commit the code that uses it. The rule is simple: *can't explain it, don't ship it.*

In an era where it's easy to generate code nobody understands, this is the opposite bet. The build is the proof I can ship. `LEARNING.md` is the proof I understand what I shipped.

## Running locally

```bash
# install
npm install

# set up your environment
# create a .env file with:
#   DATABASE_URL   -> pooled Neon connection string
#   DIRECT_URL     -> direct Neon connection string
#   ADMIN_USER     -> username for the /reservations login
#   ADMIN_PASS     -> password for the /reservations login

# apply the schema
npx prisma migrate dev

# (optional) load fake demo bookings
npx prisma db seed

# run
npm run dev
# open http://localhost:3000
```

## Status & roadmap

This is an active portfolio build and an early version of a product I intend to pitch to local restaurants. The reservation engine is done. The next phase is layering on the things that turn a working booking system into a full front-of-house product.

- [x] Reservation backend (Prisma + Neon, Zod-validated API route)
- [x] Book a Table form wired to the API
- [x] `/reservations` read-back view
- [x] Admin login on `/reservations` (Basic Auth via `proxy.ts`)
- [x] Live in production on Vercel
- [ ] **AI chatbot / front-of-house assistant.** A website chat agent that answers common guest questions (hours, menu, location), takes booking requests in natural language, and hands off to the reservation system. The goal is to give a small restaurant a 24/7 first point of contact without hiring for it. This ties into a broader AI services direction I'm building toward, with restaurants as the first vertical.
- [ ] Email confirmation on booking
- [ ] Admin controls (confirm or cancel a reservation)
- [ ] Swap placeholder images and branding per client (the per-restaurant customization layer)
- [ ] Custom domain

---

Built by Will Drain. Recent CS grad, nine years in restaurants, learning full-stack in public.

- **X:** [@WillDoesTechno](https://x.com/WillDoesTechno)
- **LinkedIn:** [william-drain](https://www.linkedin.com/in/william-drain)