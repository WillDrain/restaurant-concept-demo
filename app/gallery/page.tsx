import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Gallery | Oves Restaurant",
};

export default function GalleryPage() {
  return (
    <ContentPage
      title="Gallery"
      intro="Photos of the restaurant, boardwalk views, private party space, and seasonal favorites."
    >
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["Boardwalk Views", "Private Parties", "Fresh Donuts"].map((label) => (
          <div
            key={label}
            className="flex aspect-[4/3] items-center justify-center rounded-xl border border-oves-teal/20 bg-oves-cream text-sm font-medium text-oves-navy/80"
          >
            {label}
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
