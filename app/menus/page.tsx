import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { MenusView } from "@/components/menus/menus-view";
import type { Menu } from "@/lib/menu-types";
import menuData from "@/data/menu.json";

const menu = menuData as Menu;

export const metadata: Metadata = {
  title: "Our Menus | Tide & Table",
  description:
    "Breakfast, lunch, dinner, kids menu, and fresh-baked treats at Tide & Table — a fictional boardwalk restaurant concept.",
};

export default function MenusPage() {
  return (
    <PageShell>
      <MenusView menu={menu} />
    </PageShell>
  );
}
