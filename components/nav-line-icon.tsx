import type { NavIconName } from "@/lib/navigation";

const iconClass = "h-3.5 w-3.5 shrink-0";

export function NavLineIcon({ name }: { name: NavIconName }) {
  switch (name) {
    case "menus":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M7 5h10v14H7z" strokeLinejoin="round" />
          <path d="M9 9h6M9 12h5M9 15h6" strokeLinecap="round" />
        </svg>
      );
    case "bike":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="6" cy="17" r="2.5" />
          <circle cx="18" cy="17" r="2.5" />
          <path d="M6 17l3-7h4l2 2h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "beach":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M5 18c3-1 6-1 9 0s6 1 9 0" strokeLinecap="round" />
          <path d="M12 6v12M9.5 9L12 6l2.5 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "gallery":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="4" y="6" width="16" height="12" rx="1.5" />
          <circle cx="9" cy="11" r="1.25" fill="currentColor" stroke="none" />
          <path d="M4 15l4-3 3 2 5-5 4 4" strokeLinejoin="round" />
        </svg>
      );
    case "directions":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 21s6-4.5 6-9a6 6 0 1 0-12 0c0 4.5 6 9 6 9z" />
          <circle cx="12" cy="11" r="1.75" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
