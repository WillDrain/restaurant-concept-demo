import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { SiteHeaderNav } from "@/components/site-header-nav";

function TopUtilityBar() {
  return (
    <div className="border-b border-brand-sun/15 bg-brand-navy">
      <div className="mx-auto flex max-w-5xl flex-col gap-1.5 px-3 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="font-display text-[11px] text-brand-sand sm:text-xs">
          <span className="font-semibold text-brand-cream">Coastal Kitchen</span>
          <span className="mx-1.5 text-brand-sun/50">·</span>
          Fresh every day
        </p>

        <p className="font-display text-[11px] leading-snug text-brand-sand sm:text-xs">
          <Link
            href="/directions"
            className="text-brand-cream transition-colors hover:text-brand-sun"
          >
            123 Boardwalk Ave · Seaside Demo, NJ
          </Link>
          <span className="mx-1.5 text-brand-sun/50">·</span>
          Open Daily
          <span className="mx-1.5 text-brand-sun/50">·</span>
          <a
            href="tel:5552480199"
            className="text-brand-cream transition-colors hover:text-brand-sun"
          >
            (555) 248-0199
          </a>
        </p>
      </div>
    </div>
  );
}

function LogoBand() {
  return (
    <div className="border-b border-brand-sun/20 bg-brand-teal px-3 py-1 sm:px-4 sm:py-1.5">
      <div className="mx-auto flex max-w-5xl justify-center">
        <Wordmark />
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="bg-brand-teal">
      <TopUtilityBar />
      <LogoBand />
      <SiteHeaderNav />
    </header>
  );
}
