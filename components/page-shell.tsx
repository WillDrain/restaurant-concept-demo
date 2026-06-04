import { SiteHeader } from "@/components/site-header";

export function PageShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-brand-cream text-brand-navy">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-brand-teal/20 bg-brand-sand px-4 py-6 text-center">
        <div className="brand-divider mx-auto" />
        <p className="mt-4 font-display text-base text-brand-navy">
          Tide &amp; Table
        </p>
        <p className="mt-1 text-sm text-brand-navy/65">
          123 Boardwalk Ave · Seaside Demo, NJ 00000
        </p>
        <a
          href="tel:+15552480199"
          className="mt-2 inline-block font-display text-sm text-brand-teal hover:text-brand-sun"
        >
          (555) 248-0199
        </a>
      </footer>
    </div>
  );
}
