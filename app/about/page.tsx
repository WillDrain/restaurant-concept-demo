import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "About Us | Tide & Table",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About Us"
      intro="Tide & Table has been family owned and operated on the boardwalk for generations."
    >
      <p className="mt-6 text-base leading-7 text-brand-navy/80">
        What began as a boardwalk business has grown into a beloved destination
        for seafood, private parties, and unforgettable beach views. Today, the
        second and third generations of the family continue serving guests
        through the summer season and beyond.
      </p>
    </ContentPage>
  );
}
