"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLineIcon } from "@/components/nav-line-icon";
import { navItems, type NavItem } from "@/lib/navigation";

function NavLink({
  item,
  onNavigate,
  className = "",
}: {
  item: NavItem;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`inline-flex items-center gap-1.5 border-b-2 border-transparent pb-0.5 font-display text-sm transition-colors sm:text-[15px] ${
        isActive
          ? "border-oves-sun text-oves-navy"
          : "text-oves-navy/80 hover:border-oves-sun/70 hover:text-oves-sun"
      } ${className}`}
    >
      {item.icon && <NavLineIcon name={item.icon} />}
      <span>{item.label}</span>
    </Link>
  );
}

export function SiteHeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-oves-sun/25 bg-oves-cream shadow-[0_5px_16px_rgba(14,44,78,0.12)]"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-2 sm:px-4 md:justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-sm border border-oves-navy/10 px-2 py-1 font-display text-sm text-oves-navy transition-colors hover:border-oves-sun hover:text-oves-sun md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
          Menu
        </button>

        <ul className="hidden items-center gap-5 lg:gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>

        <a
          href="tel:6093983712"
          className="inline-flex items-center rounded-sm border border-oves-sun/60 bg-oves-sand px-3 py-1 font-display text-sm font-semibold text-oves-navy transition-colors hover:border-oves-sun hover:bg-oves-sun/20 hover:text-oves-navy md:hidden"
        >
          Call
        </a>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-oves-sun/20 px-3 py-2 md:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col gap-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  onNavigate={() => setMenuOpen(false)}
                  className="block px-1 py-2.5"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
