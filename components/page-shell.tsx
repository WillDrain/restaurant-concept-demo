import { SiteHeader } from "@/components/site-header";

export function PageShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-oves-cream text-oves-navy">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-oves-teal/20 bg-oves-sand px-4 py-6 text-center">
        <div className="oves-divider mx-auto" />
        <p className="mt-4 font-display text-base text-oves-navy">
          Oves Restaurant
        </p>
        <p className="mt-1 text-sm text-oves-navy/65">
          4th and Boardwalk · Ocean City, NJ 08226
        </p>
        <a
          href="tel:+16093983712"
          className="mt-2 inline-block font-display text-sm text-oves-teal hover:text-oves-sun"
        >
          (609) 398-3712
        </a>
      </footer>
    </div>
  );
}
