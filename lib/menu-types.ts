export type MenuTag = "GF" | "VF";

export type Modifier = {
  category: string;
  price: string;
  options?: string;
};

export type Item = {
  name: string;
  price: string;
  tags?: MenuTag[];
  notes?: string;
};

export type Group = {
  name: string;
  description?: string;
  tags?: MenuTag[];
  price?: string;
  items: Item[];
  modifiers?: Modifier[];
  footnote?: string;
};

export type Section = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  featured?: boolean;
  groups: Group[];
  footnote?: string;
};

export type TagDefinition = {
  label: string;
  description: string;
};

export type Disclaimers = {
  gratuity: string;
  pricing: string;
  cashSurcharge: string;
  rawFood: string;
  glutenFriendly: string;
  veganFriendly: string;
  chicken: string;
  seafood: string;
};

export type Menu = {
  lastUpdated: string;
  established: number;
  tags: Record<MenuTag, TagDefinition>;
  sections: Section[];
  disclaimers: Disclaimers;
};
