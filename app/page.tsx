import { CtaButton } from "@/components/cta-button";
import { HomeHero } from "@/components/home/hero";
import { HomeHighlights } from "@/components/home/highlights";
import { HomeMealHours } from "@/components/home/meal-hours";
import { HomeTradition } from "@/components/home/tradition";
import { PageShell } from "@/components/page-shell";

export default function Home() {
  return (
    <PageShell>
      <HomeHero />
      <HomeTradition />
      <HomeMealHours />
      <HomeHighlights />

      <section className="border-t border-brand-teal/10 bg-brand-sand/40 py-10 sm:py-12">
        <div className="brand-container text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-navy sm:text-3xl">
            Ready to visit Tide &amp; Table?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-navy/70 sm:text-base">
            Browse the menu, find us on the boardwalk, or call ahead for
            reservations and private party details.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaButton href="/menus">View Menus</CtaButton>
            <CtaButton href="/directions" variant="secondary">
              Get Directions
            </CtaButton>
            <CtaButton href="tel:+15552480199" variant="gold">
              Call Now
            </CtaButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
