const meals = [
  {
    title: "Breakfast",
    hours: "7am – 12pm daily",
    note: "Boardwalk mornings, fresh coffee, and the start of a beach day.",
  },
  {
    title: "Lunch",
    hours: "12pm – 5pm",
    note: "Classic shore favorites served with a view of the sand and surf.",
  },
  {
    title: "Dinner",
    hours: "5pm – 8:30pm",
    note: "Seafood, sunsets, and the kind of dinner you plan your week around.",
  },
];

export function HomeMealHours() {
  return (
    <section className="oves-section">
      <div className="oves-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="oves-badge">Hours</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-oves-navy sm:text-4xl">
            Plan your visit
          </h2>
          <div className="oves-divider mx-auto mt-4" />
          <p className="mt-4 text-base leading-7 text-oves-navy/75">
            Open daily during the season. Stop in for a quick donut, a full
            breakfast, or a relaxed dinner overlooking the boardwalk.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {meals.map((meal) => (
            <article key={meal.title} className="oves-card p-5 text-center">
              <h3 className="font-display text-xl font-semibold text-oves-teal">
                {meal.title}
              </h3>
              <p className="mt-2 font-display text-sm font-medium text-oves-sun">
                {meal.hours}
              </p>
              <div className="mx-auto mt-3 h-px w-10 bg-oves-teal/20" />
              <p className="mt-3 text-sm leading-relaxed text-oves-navy/70">
                {meal.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
