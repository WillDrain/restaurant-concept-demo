import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Bike Rentals | Tide & Table",
};

const rentals = [
  "Single Bike",
  "Tandem Bike",
  "Kids Bike and Helmet",
  "Bike with Baby Seat",
];

export default function BikeRentalsPage() {
  return (
    <ContentPage
      title="Bike Rentals"
      intro="Take a ride on the boardwalk. Rentals available daily from 7am to 12pm."
    >
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
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
