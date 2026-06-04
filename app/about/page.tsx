import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "About Us | Oves Restaurant",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About Us"
      intro="Founded in 1968, Oves Restaurant has been family owned and operated on the Ocean City boardwalk for generations."
    >
      <p className="mt-6 text-base leading-7 text-oves-navy/80">
        What began as a boardwalk business has grown into a beloved destination
        for seafood, private parties, and unforgettable beach views. Today, the
        second and third generations of the Oves family continue serving guests
        from Memorial Day through Labor Day and beyond.
      </p>
    </ContentPage>
  );
}
