import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Contact Us | Tide & Table",
};

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact Us"
      intro="Questions about reservations, private parties, or rentals? Reach out to the Tide & Table team."
    >
      <div className="mt-8 space-y-4 text-brand-navy/80">
        <p>
          <strong className="text-brand-navy">Phone:</strong>{" "}
          <a href="tel:+15552480199" className="hover:text-brand-teal">
            (555) 248-0199
          </a>
        </p>
        <p>
          <strong className="text-brand-navy">Location:</strong> 123 Boardwalk
          Ave, Seaside Demo, NJ 00000
        </p>
        <p>
          <strong className="text-brand-navy">Hours:</strong> Open Daily, 9am –
          9pm
        </p>
        <p>
          <strong className="text-brand-navy">Private Parties:</strong> Ask for
          our events team when calling about reservations.
        </p>
      </div>
    </ContentPage>
  );
}
