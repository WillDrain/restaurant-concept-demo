import { CtaButton } from "@/components/cta-button";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function HomeHero() {
  return (
    <section className="oves-section">
      <div className="oves-container">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <span className="oves-badge">Family Owned · Ocean City Boardwalk</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-oves-navy sm:text-5xl lg:text-[3.25rem]">
              Breakfast by the beach. Donuts by tradition.
            </h1>
            <div className="oves-divider mt-5" />
            <p className="mt-5 max-w-xl text-base leading-7 text-oves-navy/80 sm:text-lg">
              For over 55 years, Oves Restaurant has welcomed boardwalk
              families with fresh apple cider donuts, seaside views, and the
              warm feeling of a place that remembers your name.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaButton href="/menus">View Menus</CtaButton>
              <CtaButton href="/directions" variant="secondary">
                Get Directions
              </CtaButton>
              <CtaButton href="tel:+16093983712" variant="gold">
                Call Now
              </CtaButton>
            </div>

            <p className="mt-6 text-sm text-oves-navy/60">
              Open mid-May through mid-September · 4th &amp; Boardwalk
            </p>
          </div>

          <PhotoPlaceholder
            label="Boardwalk & beach view"
            caption="Hero photo placeholder for tomorrow's shoot."
            aspect="video"
            className="lg:aspect-[5/4]"
          />
        </div>
      </div>
    </section>
  );
}
