import { BookATableForm } from "@/components/BookATableForm";
import { CtaButton } from "@/components/cta-button";
import { SiteHeader } from "@/components/site-header";

const signatureDishes = [
  {
    name: "Catch of the Day",
    description: "Line-caught fish, citrus, and a pinch of sea salt.",
  },
  {
    name: "Boardwalk Breakfast",
    description: "Eggs, fresh-baked bread, and easy morning light.",
  },
  {
    name: "Golden-Hour Plates",
    description: "Small coastal plates made for sunset by the water.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-brand-cream text-brand-navy">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="brand-section">
          <div className="brand-container">
            <div className="mx-auto max-w-2xl py-10 text-center sm:py-16">
              <span className="brand-badge">Coastal Kitchen · On the Boardwalk</span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-brand-navy sm:text-6xl">
                Tide &amp; Table
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-brand-navy/75 sm:text-xl">
                Fresh coastal plates and golden-hour dinners where the tide meets
                the table.
              </p>
              <div className="mt-8">
                <CtaButton href="#book">Book a Table</CtaButton>
              </div>
            </div>
          </div>
        </section>

        {/* Signature dishes */}
        <section className="brand-section border-y border-brand-teal/10 bg-brand-sand/35">
          <div className="brand-container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="brand-badge">On the menu</span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">
                Signature plates
              </h2>
              <div className="brand-divider mx-auto mt-4" />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {signatureDishes.map((dish) => (
                <article key={dish.name} className="brand-card p-6 text-center">
                  <h3 className="font-display text-xl font-semibold text-brand-teal">
                    {dish.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                    {dish.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Book a Table */}
        <section
          id="book"
          className="brand-section border-t border-brand-teal/10 bg-brand-cream"
        >
          <div className="brand-container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="brand-badge">Reservations</span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">
                Book a Table
              </h2>
              <div className="brand-divider mx-auto mt-4" />
              <p className="mt-4 text-base leading-7 text-brand-navy/75">
                Reserve your spot by the water. Tell us when you&apos;re coming and
                how many to expect, and we&apos;ll take care of the rest.
              </p>
            </div>
            <div className="mt-8">
              <BookATableForm />
            </div>
          </div>
        </section>
      </main>

      {/* Portfolio / recruiter footer */}
      <footer className="border-t border-brand-sun/15 bg-brand-navy text-brand-cream">
        <div className="brand-container py-10 text-center">
          <p className="font-display text-lg font-semibold">Tide &amp; Table</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-brand-cream/75">
            Tide &amp; Table is a concept demo built by Will Drain.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:gap-6">
            <a
              href="https://github.com/WillDrain/restaurant-concept-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-semibold text-brand-sand transition-colors hover:text-brand-sun"
            >
              GitHub repository
            </a>
            <a
              href="https://willdrain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-semibold text-brand-sand transition-colors hover:text-brand-sun"
            >
              willdrain.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
