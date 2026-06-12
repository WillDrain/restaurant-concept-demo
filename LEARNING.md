## API Route

The browser can't reach the database directly because it doesn't have and can never be given the credentials. Those live on the server with the API route. The browser can only ask the route, and the route checks the request, then talks to the database itself.

## fetch failure detection + status codes

Validation is a 400(bad request). 404 means the route/url doesn't exist. 400 means the route ran fine but the data sent was rejected.

fetch only rejects on a network failure
400 is a successful HTTP round-trip.
try/catch will not catch a 400

For rejected request detection. I check response.ok
If !response.ok, read the error body and show it.... other wise success 

## Pooled vs direct DB connections (DATABASE_URL vs DIRECT_URL)

Postgres has a max number of connections it can hold open. Serverless breaks this: my API route on Vercel isn't one server — every request can spawn its own function instance, and under load there could be tons running at once. If each one opens its own direct DB connection, I blow past Neon's connection limit and the DB starts refusing connections.

Fix = a connection POOLER (Neon provides one, PgBouncer). It holds a few real connections and lets all the function instances share them.

- DATABASE_URL = the POOLED string (has -pooler in the hostname). This is what the app uses for normal queries at runtime. Everyday traffic road.
- DIRECT_URL = the UNPOOLED straight-to-DB string. Prisma needs this for MIGRATIONS / schema changes, because those need one stable session the pooler can't guarantee. Maintenance road.

Same database, two roads, different jobs. Production was broken without these because the live route had no road to the DB at all.

## Server vs Client Components — the DB access line (read path vs write path)

"Server" and "client" are NOT people (not the customer vs the business). They're WHERE THE CODE RUNS.
- Server Component = runs on the server before anything hits the browser. CAN touch the DB directly (credentials live there). Ships finished HTML.
- Client Component ("use client") = runs in the visitor's browser. CANNOT touch the DB. Has to go through an API route.

Both still show the page to the same human — the question is only where the data-fetching code runs on the way there.

WRITE path (BookATableForm): runs in the browser → can't reach DB → MUST go through an API route. That's why the form needed /api/reservations.

READ path (/reservations): make it a Server Component → it queries Prisma directly, renders HTML with data already in it, ships it. NO API route needed, because the page is already running on the side that can reach the DB.

Same boundary, opposite directions. Default to Server Component; only reach for client-side fetch when I need live updates or interactivity (e.g. a real-time dashboard).

## Static vs Dynamic rendering — when does a page's code actually run?

A Next.js page can run at two totally different moments, and this is invisible in the code:

STATIC (the default): the component runs ONCE at BUILD time (when Vercel builds the deploy). It captures the resulting HTML as a frozen file and serves that same snapshot to everyone. Fast + cheap. Right for pages that don't change (menu, about, landing).

DYNAMIC (force-dynamic): the component runs FRESH on EVERY request. Someone visits → server runs my function right then → queries the DB at that moment → builds HTML with current data. Slower (DB hit per visit) but always live.

Why /reservations needs force-dynamic:
If it were left static, Vercel would run it once at build time and freeze whatever bookings existed THEN. A new booking made afterward would be invisible — the page is a snapshot from deploy time. It'd look broken even though the DB is fine and the row saved. The data's there; the page just took its photo too early.

export const dynamic = "force-dynamic" = "don't snapshot at build, run this on every request." Forces the DB query to run per-visit.

Rule of thumb: keep pages static by default (faster). Only reach for force-dynamic when the page must reflect data that changes AFTER deploy — like a reservations list. A menu page does NOT need it.

## Static vs Dynamic Rendering (Next.js)
- No `force-dynamic` = page is rendered ONCE at build time (`next build`), served as cached HTML from CDN. Content frozen until redeploy.
- `force-dynamic` = page re-renders on every request. Needed when data changes between requests (e.g., /reservations reading live bookings).
- Rule: match rendering strategy to how often the data changes. Homepage = static. Live bookings = dynamic.
- My miss: thought the snapshot happened "on load" — it happens at build time, before any visitor exists.

## Middleware & Server-Side Auth (Next.js)
- Order: middleware → (if allowed) Server Component render → DB query. Middleware runs BEFORE any page code.
- Failed auth = 401 at the edge. The component never renders, the query never runs, data never leaves the DB.
- Disabling JS does nothing: middleware + Server Components + Prisma all run on the server. Browser only receives the result (401 or HTML).
- Real security is enforced server-side. Client-side checks (hiding UI in React) ship the data anyway — view source defeats them.
- My miss: had the order backwards (thought the component rendered first). The whole point of middleware is that it runs first.

## Destructive DB ops vs. config files (Prisma seed / deleteMany)

- `.env` holds **configuration** (DATABASE_URL, secrets) as key=value. It does NOT
  hold table data. Conflating "where config lives" with "where data lives" is how
  people wipe data thinking a copy exists. There is no automatic copy.
- Table rows live only in the database (Neon Postgres), reachable via the connection
  string. `prisma.x.deleteMany({})` = SQL `DELETE FROM "table"`. No file backup happens.
- Once a DELETE commits, rows are gone. "Manually re-add" is only possible if you
  captured them BEFORE deleting.
- RULE: destructive op against data you can't reconstruct → LOOK at it first
  (e.g. `npx prisma studio`), then decide to keep/discard as a deliberate call.
- Seeds are run via Prisma's built-in runner by adding a top-level `"prisma": { "seed": "..." }`
  key to package.json, then `npx prisma db seed` (it auto-loads .env).