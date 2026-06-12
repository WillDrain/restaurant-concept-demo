# Tide & Table — Restaurant Site + Reservation System

A mock restaurant website template with a working, low-cost reservation system built for independent restaurants. Not a static mockup — a real full-stack app: bookings are validated, saved to a live Postgres database, and read back out on a dedicated page.

**Live demo:** [restaurant-concept-demo.vercel.app](https://restaurant-concept-demo.vercel.app)

> **Note:** This is a template/model, not a finished site for one specific restaurant. The images are intentional placeholders — in a real client build, they'd be swapped for that restaurant's own photography, menu, and branding. What's *real* and fully working is the engine underneath: the reservation system, validation, database, and live deploy. The template is the part you customize per client; the engine is the part that's done.

---

## Why I built this

I built this because of my own experience in the restaurant industry. I spent nine years in restaurants before I wrote a line of production code, and I kept seeing the same thing: small, family-owned places overpaying for websites and booking software — bloated tools priced for chains, sold to restaurants that just need the basics to work.

So I decided to build one myself. Something a small restaurant can actually afford, made by someone who's worked the floor and knows what they actually need — not guessing from the outside. This is the working proof of that idea, and the first step toward pitching it to local restaurants for real.

## What it does

- **Book a Table form** — a guest submits name, contact, party size, and date. Input is validated, saved to the database, and confirmed.
- **Server-side validation** — every submission is checked with Zod on the server before anything touches the database. Bad input gets a clear error, not a crash.
- **Reservations view** (`/reservations`) — reads every booking back out of the database, newest first. The backend isn't just an endpoint you take on faith — you can see it work.
- **Live in production** — deployed on Vercel against a hosted Neon Postgres database. The form you click writes a real row.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Prisma** ORM + **Neon** (serverless Postgres)
- **Zod** for runtime validation
- **Vercel** for hosting + CI deploys

## Technical decisions I can defend

I don't ship code I can't explain. Before every commit on this project, I have to explain the concept behind it in my own words — if I can't, I stop and learn it first. A few of the decisions in this repo and *why* they're built that way:

- **The API route is a trust boundary, not a formality.** The browser can't talk to the database directly — database credentials live server-side. The booking form POSTs to an API route that validates the request (Zod) and is the only thing that talks to the DB. The form runs in the browser, on the wrong side of that line, so it *has* to go through the route.
- **`/reservations` is a Server Component with no API route — on purpose.** The read path is the write path in reverse. A Server Component already runs on the side that can reach the database, so it queries Prisma directly and ships finished HTML. No extra endpoint needed. Same boundary, opposite direction.
- **Two database URLs (pooled + direct) because serverless changes the rules.** Serverless functions can spin up many instances at once; if each opened its own direct DB connection, they'd blow past the connection limit. So runtime queries go through a pooled connection (`DATABASE_URL`), while Prisma migrations use a direct one (`DIRECT_URL`) for the stable session they need.
- **`/reservations` uses dynamic rendering, not the static default.** Most pages get cached as a snapshot at build time — fast, but frozen. A reservations list can't be frozen at deploy time, or new bookings would be invisible until the next deploy. `force-dynamic` makes it run fresh on every request so it always reflects the live database.

## How I learn (Explain-to-Ship)

This repo has a `LEARNING.md` at the root. Every concept I hit on this project, I write back in my own words before I'm allowed to commit the code that uses it. The rule is simple: *can't explain it, don't ship it.*

In an era where it's easy to generate code nobody understands, this is the opposite bet. The build is the proof I can ship; `LEARNING.md` is the proof I understand what I shipped.

## Running locally

```bash
# install
npm install

# set up your environment
# create a .env file with:
#   DATABASE_URL   -> pooled Neon connection string
#   DIRECT_URL     -> direct Neon connection string

# apply the schema
npx prisma migrate dev

# run
npm run dev
# open http://localhost:3000
```

## Status & roadmap

This is an active portfolio build and an early version of a product I intend to pitch to local restaurants. The reservation engine is done; the next phase is layering on the things that turn a working booking system into a full front-of-house product.

- [x] Reservation backend (Prisma + Neon, Zod-validated API route)
- [x] Book a Table form wired to the API
- [x] `/reservations` read-back view
- [x] Live in production on Vercel
- [ ] **AI chatbot / front-of-house assistant** — a website chat agent that answers common guest questions (hours, menu, location), takes booking requests in natural language, and hands off to the reservation system. The goal is to give a small restaurant a 24/7 first point of contact without hiring for it. This ties into a broader AI-services direction I'm building toward — restaurants as the first vertical.
- [ ] Email confirmation on booking
- [ ] Admin controls (confirm / cancel a reservation)
- [ ] Swap placeholder images/branding per client (this is the per-restaurant customization layer)
- [ ] Custom domain

---

Built by Will Drain — recent CS grad, nine years in restaurants, learning full-stack in public.

- **X:** [@WillDoesTechno](https://x.com/WillDoesTechno)
- **LinkedIn:** [william-drain](https://www.linkedin.com/in/william-drain)