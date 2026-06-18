export type NavItemMode = "icon-only" | "icon-text" | "text-only";

export interface NavItem {
  /** Текст ссылки. При mode="icon-only" оборачивается в visually-hidden */
  label: string;
  href: string;
  /** Как рендерить: только иконка, иконка+текст, только текст */
  mode: NavItemMode;
  /** Имя иконки из src/components/icons/ (без суффикса Icon) */
  icon?: "search" | "cart" | "login" | "profile" | "close";
  /** Текущая страница — подсветить ссылку */
  current?: boolean;
  /** Показывать поповер (корзина) */
  hasPopover?: boolean;
  /** Дополнительный aria-label для accessibility */
  ariaLabel?: string;
}

/**
 * Навигация сайта — основные ссылки (левая часть шапки).
 */
export const SITE_NAVIGATION: NavItem[] = [
  { label: "О нас", href: "/about", mode: "text-only" },
  { label: "Каталог", href: "/catalog", mode: "text-only" },
  { label: "Частые вопросы", href: "/faq", mode: "text-only" },
];

/**
 * Пользовательская навигация — иконки в правой части шапки.
 * Содержит: поиск, корзину, вход/профиль.
 */
export const USER_NAVIGATION: NavItem[] = [
  {
    label: "Поиск",
    href: "#",
    mode: "icon-only",
    icon: "search",
    ariaLabel: "Поиск по сайту",
  },
  {
    label: "Корзина",
    href: "#",
    mode: "icon-only",
    icon: "cart",
    hasPopover: true,
    ariaLabel: "Открыть корзину",
  },
  {
    label: "Вход",
    href: "#",
    mode: "icon-text",
    icon: "login",
    ariaLabel: "Войти в личный кабинет",
  },
];
