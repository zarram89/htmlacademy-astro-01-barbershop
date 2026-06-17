export interface NavItem {
  label: string;
  href: string;
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | "true" | false;
  children?: NavItem[];
}

export const NAVIGATION: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Наши работы", href: "/works" },
  { label: "Записаться", href: "/book" },
  { label: "Контакты", href: "/contacts" },
];
