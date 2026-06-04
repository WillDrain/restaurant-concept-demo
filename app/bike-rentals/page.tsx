import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Bike Rentals | Oves Restaurant",
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
      intro="Take a ride on the Ocean City Boardwalk. Rentals available daily from 7am to 12pm."
    >
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {rentals.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-oves-teal/20 bg-oves-cream px-4 py-3 text-oves-navy/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
