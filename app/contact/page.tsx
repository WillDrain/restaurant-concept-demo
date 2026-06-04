import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Contact Us | Oves Restaurant",
};

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact Us"
      intro="Questions about reservations, private parties, or rentals? Reach out to the Oves team."
    >
      <div className="mt-8 space-y-4 text-oves-navy/80">
        <p>
          <strong className="text-oves-navy">Phone:</strong>{" "}
          <a href="tel:+16093983712" className="hover:text-oves-teal">
            (609) 398-3712
          </a>
        </p>
        <p>
          <strong className="text-oves-navy">Location:</strong> 4th and
          Boardwalk, Ocean City, NJ 08226
        </p>
        <p>
          <strong className="text-oves-navy">Hours:</strong> Open Daily, 7am -
          8:30pm
        </p>
        <p>
          <strong className="text-oves-navy">Private Parties:</strong> Ask for
          John Oves when calling about reservations.
        </p>
      </div>
    </ContentPage>
  );
}
