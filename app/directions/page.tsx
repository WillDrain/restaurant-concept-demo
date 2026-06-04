import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Directions | Oves Restaurant",
};

export default function DirectionsPage() {
  return (
    <ContentPage
      title="Directions"
      intro="Find us at the corner of 4th Street and the Boardwalk in Ocean City, New Jersey."
    >
      <div className="mt-8 space-y-4 text-oves-navy/80">
        <p>
          <strong className="text-oves-navy">Address:</strong> 4th and
          Boardwalk, Ocean City, NJ 08226
        </p>
        <p>
          <strong className="text-oves-navy">Parking:</strong> Public parking
          is available near the boardwalk during the summer season.
        </p>
        <a
          href="https://maps.google.com/?q=4th+and+Boardwalk+Ocean+City+NJ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-oves-teal px-5 py-2.5 text-sm font-medium text-oves-cream transition-colors hover:bg-oves-sun hover:text-oves-navy"
        >
          Open in Google Maps
        </a>
      </div>
    </ContentPage>
  );
}
