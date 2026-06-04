import Link from "next/link";
import { OvesLogo } from "@/components/oves-logo";
import { SiteHeaderNav } from "@/components/site-header-nav";

function TopUtilityBar() {
  return (
    <div className="border-b border-oves-sun/15 bg-oves-navy">
      <div className="mx-auto flex max-w-5xl flex-col gap-1.5 px-3 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="font-display text-[11px] text-oves-sand sm:text-xs">
          <span className="font-semibold text-oves-cream">Apple Cider Donuts</span>
          <span className="mx-1.5 text-oves-sun/50">·</span>
          Made fresh daily
        </p>

        <p className="font-display text-[11px] leading-snug text-oves-sand sm:text-xs">
          <Link
            href="/directions"
            className="text-oves-cream transition-colors hover:text-oves-sun"
          >
            4th &amp; Boardwalk · Ocean City, NJ
          </Link>
          <span className="mx-1.5 text-oves-sun/50">·</span>
          Open Daily
          <span className="mx-1.5 text-oves-sun/50">·</span>
          <a
            href="tel:6093983712"
            className="text-oves-cream transition-colors hover:text-oves-sun"
          >
            609-398-3712
          </a>
        </p>
      </div>
    </div>
  );
}

function LogoBand() {
  return (
    <div className="border-b border-oves-sun/20 bg-oves-teal px-3 py-1 sm:px-4 sm:py-1.5">
      <div className="mx-auto flex max-w-5xl justify-center">
        <OvesLogo />
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="bg-oves-teal">
      <TopUtilityBar />
      <LogoBand />
      <SiteHeaderNav />
    </header>
  );
}
