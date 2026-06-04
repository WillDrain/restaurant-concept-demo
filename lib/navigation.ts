export type NavIconName =
  | "menus"
  | "bike"
  | "beach"
  | "gallery"
  | "directions";

export type NavItem = {
  href: string;
  label: string;
  icon?: NavIconName;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/menus", label: "Menus", icon: "menus" },
  { href: "/about", label: "About" },
  { href: "/bike-rentals", label: "Bike Rentals", icon: "bike" },
  { href: "/beach-rentals", label: "Beach Rentals", icon: "beach" },
  { href: "/gallery", label: "Gallery", icon: "gallery" },
  { href: "/directions", label: "Directions", icon: "directions" },
  { href: "/contact", label: "Contact" },
];
