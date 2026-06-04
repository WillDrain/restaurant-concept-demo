import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Directions | Tide & Table",
};

export default function DirectionsPage() {
  return (
    <ContentPage
      title="Directions"
      intro="Find us at 123 Boardwalk Ave in Seaside Demo — a fictional shore town."
    >
      <div className="mt-8 space-y-4 text-brand-navy/80">
        <p>
          <strong className="text-brand-navy">Address:</strong> 123 Boardwalk
          Ave, Seaside Demo, NJ 00000
        </p>
        <p>
          <strong className="text-brand-navy">Parking:</strong> Public parking
          is available near the boardwalk during the summer season.
        </p>
        <a
          href="https://maps.google.com/?q=123+Boardwalk+Ave+Seaside+Demo+NJ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-brand-teal px-5 py-2.5 text-sm font-medium text-brand-cream transition-colors hover:bg-brand-sun hover:text-brand-navy"
        >
          Open in Google Maps
        </a>
      </div>
    </ContentPage>
  );
}
