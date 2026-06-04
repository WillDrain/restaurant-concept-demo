import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function HomeTradition() {
  return (
    <section className="brand-section border-y border-brand-teal/10 bg-brand-sand/35">
      <div className="brand-container">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <PhotoPlaceholder
            label="Tide & Table dining room"
            caption="Placeholder for a nostalgic interior or boardwalk dining photo."
            aspect="portrait"
          />

          <div>
            <span className="brand-badge">A Boardwalk Tradition</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">
              A boardwalk tradition, passed down with care
            </h2>
            <div className="brand-divider mt-4" />
            <p className="mt-4 text-base leading-7 text-brand-navy/80">
              What began as a family business on the boardwalk has
              grown into a beloved destination for breakfast with a view, fresh
              seafood, private parties, and the simple joy of a fresh breakfast
              before the beach gets busy.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-navy/80">
              Today, the second and third generations of the family still
              serve guests with the same hospitality that built this place—weather
              or not, the view is always worth the visit.
            </p>
            <p className="mt-5 font-display text-sm font-medium text-brand-sun">
              Celebrating generations on the boardwalk
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
