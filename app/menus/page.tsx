import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { MenusView } from "@/components/menus/menus-view";
import type { Menu } from "@/lib/menu-types";
import menuData from "@/data/menu.json";

const menu = menuData as Menu;

export const metadata: Metadata = {
  title: "Our Menus | Oves Restaurant",
  description:
    "Breakfast, lunch, dinner, kids menu, and fresh apple cider donuts at Oves Restaurant on the Ocean City boardwalk.",
};

export default function MenusPage() {
  return (
    <PageShell>
      <MenusView menu={menu} />
    </PageShell>
  );
}
