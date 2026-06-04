import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Beach Rentals | Tide & Table",
};

const rentals = [
  "Single Surrey – two adults and two young children up front",
  "Double Surrey – four adults and two young children up front",
  "Triple Surrey – six adults and two young children up front",
];

export default function BeachRentalsPage() {
  return (
    <ContentPage
      title="Beach Rentals"
      intro="Tide & Table surrey rentals are a boardwalk favorite for families exploring the shore together."
    >
      <ul className="mt-8 space-y-3">
        {rentals.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-brand-teal/20 bg-brand-cream px-4 py-3 text-brand-navy/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
