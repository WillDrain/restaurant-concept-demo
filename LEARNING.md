# LEARNING.md

Notes on what I learned building Tide & Table, written in my own words. This is part of my Explain-to-Ship rule: if I can't explain it here, I don't ship it.

## How the browser talks to the database

The browser can't reach the database directly. It doesn't have the credentials, and it never should. Those live on the server with the API route. So the browser asks the route, the route checks the request, and the route talks to the database itself.

## Catching a failed fetch (status codes)

The status codes I actually deal with:

- `400` means the route ran fine but rejected the data I sent. That's a validation failure (bad request).
- `404` means the route or URL doesn't exist.

The catch: `fetch` only rejects on a network failure. A `400` is still a successful HTTP round-trip, so a `try/catch` won't catch it. The request technically worked, the server just said no.

That's why I check `response.ok` instead of leaning on `try/catch`. If `!response.ok`, I read the error body and show it. Otherwise I treat it as a success.

## Pooled vs direct database connections (DATABASE_URL vs DIRECT_URL)

Postgres can only hold so many connections open at once. Serverless breaks that limit. My API route on Vercel isn't one server, it's a function that can spawn a separate instance for every request, and under load there could be a ton of them running at the same time. If each one opens its own direct connection to the database, I blow past Neon's limit and the database starts refusing connections.

The fix is a connection pooler. Neon provides one (PgBouncer). It holds a few real connections open and lets all the function instances share them.

So I keep two connection strings:

- `DATABASE_URL` is the pooled string (it has `-pooler` in the hostname). The app uses this for normal queries at runtime. This is the everyday traffic road.
- `DIRECT_URL` is the unpooled, straight-to-database string. Prisma needs this for migrations and schema changes, because those need one stable session that a pooler can't guarantee. This is the maintenance road.

Same database, two roads, different jobs. Production was broken without these because the live route had no road to the database at all.

## Server vs Client Components (where the code runs)

"Server" and "client" are not people. They're not the customer vs the business. They describe where the code runs.

- A Server Component runs on the server before anything reaches the browser. It can touch the database directly, because the credentials live there. It ships finished HTML.
- A Client Component (`"use client"`) runs in the visitor's browser. It cannot touch the database. It has to go through an API route.

Both still show the page to the same person. The only question is where the data-fetching code runs on the way there.

That split is why the two paths in my app behave differently:

- The write path (the booking form) runs in the browser, so it can't reach the database. It has to go through an API route. That's why the form needed `/api/reservations`.
- The read path (the `/reservations` page) is a Server Component. It queries Prisma directly, renders HTML with the data already in it, and ships that. No API route needed, because the page is already running on the side that can reach the database.

Same boundary, opposite directions. I default to a Server Component and only reach for a client-side fetch when I need live updates or interactivity, like a real-time dashboard.

## Static vs dynamic rendering (when does the page actually run?)

A Next.js page can run at two completely different moments, and you can't tell which from the code alone.

- Static is the default. The component runs once, at build time, when Vercel builds the deploy. It captures the resulting HTML as a frozen file and serves that same snapshot to everyone. Fast and cheap. Right for pages that don't change, like the menu, the about page, or the landing page.
- Dynamic (`force-dynamic`) means the component runs fresh on every request. Someone visits, the server runs my function right then, queries the database at that moment, and builds the HTML with current data. Slower, because it hits the database on every visit, but always live.

Why `/reservations` needs `force-dynamic`: if I left it static, Vercel would run it once at build time and freeze whatever bookings existed then. Any booking made afterward would be invisible, because the page is just a snapshot from deploy time. It would look broken even though the database is fine and the row saved. The data is there, the page just took its photo too early.

`export const dynamic = "force-dynamic"` means "don't snapshot at build, run this on every request." It forces the database query to run per visit.

Rule of thumb: keep pages static by default because it's faster, and only reach for `force-dynamic` when the page has to reflect data that changes after deploy, like a live bookings list. A menu page doesn't need it.

Where I was wrong: I thought the snapshot happened when the page loads. It actually happens at build time, before any visitor exists.

## Middleware and server-side auth

The order matters. Middleware runs first, then (if the request is allowed) the Server Component renders, then the database query runs. Middleware runs before any page code.

If auth fails, it's a `401` at the edge. The component never renders, the query never runs, and the data never leaves the database.

Turning off JavaScript does nothing here. Middleware, Server Components, and Prisma all run on the server. The browser only ever receives the result, either a `401` or finished HTML.

Real security is enforced on the server. Client-side checks, like hiding UI in React, ship the data anyway. View source defeats them.

Where I was wrong: I had the order backwards and thought the component rendered first. The whole point of middleware is that it runs first.

## Destructive database ops vs config files

`.env` holds configuration, like `DATABASE_URL` and secrets, as key=value pairs. It does not hold table data. Mixing up "where config lives" with "where data lives" is how people wipe data thinking they have a copy somewhere. There is no automatic copy.

Table rows live only in the database (Neon Postgres), reachable through the connection string. `prisma.x.deleteMany({})` is the same as SQL `DELETE FROM "table"`. No file backup happens behind the scenes. Once a `DELETE` commits, the rows are gone. "I'll just manually re-add them" only works if I captured them before deleting.

My rule: before running a destructive op against data I can't reconstruct, I look at it first (`npx prisma studio`), then decide to keep or discard it as a deliberate call.

Seeds run through Prisma's built-in runner. I add a top-level `"prisma": { "seed": "..." }` key to `package.json`, then run `npx prisma db seed`, which auto-loads `.env`.
