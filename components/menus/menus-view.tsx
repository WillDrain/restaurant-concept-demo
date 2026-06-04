"use client";

import { useMemo, useState } from "react";
import type {
  Disclaimers,
  Group,
  Item,
  Menu,
  Section,
} from "@/lib/menu-types";

function formatPrice(price: string): string {
  return /^[\d]/.test(price) ? `$${price}` : price;
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-oves-teal/20 px-2 py-0.5 text-xs font-semibold text-oves-teal">
      {tag}
    </span>
  );
}

function ItemRow({ item }: { item: Item }) {
  return (
    <li className="py-1.5">
      <div className="flex items-baseline gap-2">
        <span className="font-semibold text-oves-navy">{item.name}</span>
        {item.tags?.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
        <span
          aria-hidden
          className="mx-1 hidden flex-1 translate-y-[-0.2em] border-b border-dotted border-oves-navy/30 sm:block"
        />
        <span className="ml-auto whitespace-nowrap font-semibold tabular-nums text-oves-navy sm:ml-0">
          {formatPrice(item.price)}
        </span>
      </div>
      {item.notes ? (
        <p className="mt-0.5 max-w-prose text-sm leading-snug text-oves-navy/60">
          {item.notes}
        </p>
      ) : null}
    </li>
  );
}

function ModifiersCallout({ group }: { group: Group }) {
  if (!group.modifiers?.length) return null;

  return (
    <div className="mt-4 rounded-lg border border-oves-teal/20 bg-oves-teal/10 p-4">
      <dl className="space-y-2">
        {group.modifiers.map((modifier) => (
          <div
            key={modifier.category}
            className="flex flex-wrap items-baseline gap-x-2 text-sm"
          >
            <dt className="font-semibold text-oves-navy">
              {modifier.category}
            </dt>
            <dd className="font-semibold tabular-nums text-oves-teal">
              {formatPrice(modifier.price)}
            </dd>
            {modifier.options ? (
              <dd className="w-full text-oves-navy/60">{modifier.options}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <section className="border-t border-oves-teal/15 py-6 first:border-t-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-2xl font-semibold text-oves-navy">
          {group.name}
        </h3>
        {group.tags?.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
        {group.price ? (
          <span className="font-semibold tabular-nums text-oves-teal">
            {formatPrice(group.price)}
          </span>
        ) : null}
      </div>

      {group.description ? (
        <p className="mt-1 max-w-prose text-sm italic leading-snug text-oves-navy/70">
          {group.description}
        </p>
      ) : null}

      <ul className="mt-3 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        {group.items.map((item) => (
          <ItemRow key={item.name} item={item} />
        ))}
      </ul>

      <ModifiersCallout group={group} />

      {group.footnote ? (
        <p className="mt-3 text-sm italic text-oves-navy/60">{group.footnote}</p>
      ) : null}
    </section>
  );
}

function DonutSection({ section }: { section: Section }) {
  const group = section.groups[0];
  const price = group?.items[0]?.price ?? "1.75";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-oves-sun/40 bg-oves-sand shadow-sm">
        <div className="bg-oves-teal px-6 py-5 text-center text-oves-cream">
          <h2 className="font-display text-3xl font-semibold">
            {group?.name ?? section.title}
          </h2>
          <p className="mt-1 text-sm text-oves-cream/85">
            All flavors {formatPrice(price)} each
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-1 px-6 py-6 sm:grid-cols-2">
          {(group?.items ?? []).map((flavor) => (
            <li
              key={flavor.name}
              className="flex items-baseline gap-2 border-b border-dotted border-oves-navy/20 py-2"
            >
              <span className="font-semibold text-oves-navy">
                {flavor.name}
              </span>
              <span className="ml-auto font-semibold tabular-nums text-oves-navy">
                {formatPrice(flavor.price)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mx-6 mb-6 rounded-lg border border-oves-sun/40 bg-oves-sun/15 px-4 py-3 text-center">
          <p className="font-display text-lg font-semibold text-oves-ember">
            Order by the dozen to go!
          </p>
        </div>
      </div>
    </div>
  );
}

function DisclaimersBlock({ disclaimers }: { disclaimers: Disclaimers }) {
  const lines = [
    disclaimers.glutenFriendly,
    disclaimers.veganFriendly,
    disclaimers.gratuity,
    disclaimers.pricing,
    disclaimers.cashSurcharge,
    disclaimers.rawFood,
    disclaimers.chicken,
    disclaimers.seafood,
  ];

  return (
    <section
      aria-label="Menu legend and disclaimers"
      className="mt-12 border-t border-oves-teal/20 pt-6"
    >
      <ul className="space-y-1.5 text-xs italic leading-relaxed text-oves-navy/60">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

export function MenusView({ menu }: { menu: Menu }) {
  const [activeId, setActiveId] = useState(menu.sections[0]?.id ?? "");
  const [glutenOnly, setGlutenOnly] = useState(false);

  const activeSection = useMemo(
    () => menu.sections.find((section) => section.id === activeId),
    [menu.sections, activeId],
  );

  const visibleGroups = useMemo(() => {
    if (!activeSection) return [];
    if (!glutenOnly) return activeSection.groups;

    return activeSection.groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.tags?.includes("GF")),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeSection, glutenOnly]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="text-center">
        <h1 className="font-display text-4xl font-semibold text-oves-navy sm:text-5xl">
          Our Menus
        </h1>
      </header>

      <nav
        aria-label="Menu sections"
        className="mt-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
          {menu.sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveId(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap rounded-full px-5 py-2 font-display text-sm font-semibold transition-colors sm:text-base ${
                  isActive
                    ? "bg-oves-teal text-oves-cream"
                    : "bg-oves-sand text-oves-navy hover:bg-oves-sand/70"
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          role="switch"
          aria-checked={glutenOnly}
          onClick={() => setGlutenOnly((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              setGlutenOnly((value) => !value);
            }
          }}
          className="inline-flex items-center gap-3 rounded-full px-2 py-1 text-sm font-medium text-oves-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-oves-teal focus-visible:ring-offset-2"
        >
          <span
            aria-hidden
            className={`relative inline-block h-6 w-12 shrink-0 rounded-full transition-colors ${
              glutenOnly ? "bg-oves-teal" : "bg-oves-sand"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                glutenOnly ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </span>
          <span>Show only Gluten Friendly items</span>
        </button>
      </div>

      <div className="mt-8">
        {activeSection ? (
          activeSection.featured ? (
            <DonutSection section={activeSection} />
          ) : (
            <article>
              {activeSection.subtitle ? (
                <p className="mx-auto max-w-3xl text-center text-sm italic text-oves-navy/70">
                  {activeSection.subtitle}
                </p>
              ) : null}
              {activeSection.description ? (
                <p className="mx-auto mt-2 max-w-3xl text-center text-sm italic text-oves-navy/60">
                  {activeSection.description}
                </p>
              ) : null}

              {visibleGroups.length > 0 ? (
                <div className="mt-6">
                  {visibleGroups.map((group) => (
                    <GroupBlock key={group.name} group={group} />
                  ))}
                </div>
              ) : (
                <p className="mt-10 text-center text-oves-navy/60">
                  No gluten friendly items in this section.
                </p>
              )}

              {activeSection.footnote ? (
                <p className="mt-8 text-center text-sm italic text-oves-navy/60">
                  {activeSection.footnote}
                </p>
              ) : null}
            </article>
          )
        ) : null}
      </div>

      <DisclaimersBlock disclaimers={menu.disclaimers} />
    </div>
  );
}
