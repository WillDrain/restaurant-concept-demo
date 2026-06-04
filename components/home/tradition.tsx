import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function HomeTradition() {
  return (
    <section className="oves-section border-y border-oves-teal/10 bg-oves-sand/35">
      <div className="oves-container">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <PhotoPlaceholder
            label="Oves dining room"
            caption="Placeholder for a nostalgic interior or boardwalk dining photo."
            aspect="portrait"
          />

          <div>
            <span className="oves-badge">Since 1968</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-oves-navy sm:text-4xl">
              A boardwalk tradition, passed down with care
            </h2>
            <div className="oves-divider mt-4" />
            <p className="mt-4 text-base leading-7 text-oves-navy/80">
              What began as a family business on the Ocean City boardwalk has
              grown into a beloved destination for breakfast with a view, fresh
              seafood, private parties, and the simple joy of a morning donut
              before the beach gets busy.
            </p>
            <p className="mt-4 text-base leading-7 text-oves-navy/80">
              Today, the second and third generations of the Oves family still
              serve guests with the same hospitality that built this place—weather
              or not, the view is always worth the visit.
            </p>
            <p className="mt-5 font-display text-sm font-medium text-oves-sun">
              Celebrating over 55 years on the boardwalk
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
