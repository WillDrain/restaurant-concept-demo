import { PhotoPlaceholder } from "@/components/photo-placeholder";

const highlights = [
  {
    label: "Apple cider donuts",
    caption: "Made fresh daily at Oves.",
  },
  {
    label: "Breakfast on the boardwalk",
    caption: "Morning light, ocean air, classic shore plates.",
  },
  {
    label: "Private party deck",
    caption: "Upper deck views for celebrations by the beach.",
  },
];

export function HomeHighlights() {
  return (
    <section className="oves-section bg-oves-sand/25 pb-14 sm:pb-16">
      <div className="oves-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="oves-badge">Fresh from the boardwalk</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-oves-navy sm:text-4xl">
            The flavors people come back for
          </h2>
          <div className="oves-divider mx-auto mt-4" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <PhotoPlaceholder
              key={item.label}
              label={item.label}
              caption={item.caption}
              aspect="video"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
