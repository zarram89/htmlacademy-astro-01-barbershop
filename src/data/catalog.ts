export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  manufacturer: string;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface ProductGroup {
  id: string;
  name: string;
}

export interface SortOption {
  value: string;
  label: string;
}

/** Товары каталога */
export const PRODUCTS: Product[] = [
  {
    id: "shampoo-brews",
    name: "Шампунь для мужчин Brews Daily",
    price: 744,
    image: "/images/catalog/1.jpg",
    category: "care-products",
    manufacturer: "bed-head",
  },
  {
    id: "shampoo-syoss",
    name: "Syoss шампунь Men Power & Strength",
    price: 160,
    image: "/images/catalog/2.jpg",
    category: "care-products",
    manufacturer: "so-intense",
  },
  {
    id: "shampoo-schauma",
    name: "Schauma шампунь для мужчин «Сила и объём с хмелем»",
    price: 94,
    image: "/images/catalog/3.jpg",
    category: "care-products",
    manufacturer: "sprekenhus",
  },
  {
    id: "shampoo-nivea",
    name: "Nivea Men шампунь-уход «Экстремальная свежесть с ментолом»",
    price: 173,
    image: "/images/catalog/4.jpg",
    category: "care-products",
    manufacturer: "homme-deep",
  },
  {
    id: "shampoo-amplifier",
    name: "Шампунь Amplifier Thickening",
    price: 441,
    image: "/images/catalog/5.jpg",
    category: "care-products",
    manufacturer: "firm-store",
  },
  {
    id: "shampoo-american-crew",
    name: "American Crew шампунь Anti-Dandruff",
    price: 904,
    image: "/images/catalog/6.jpg",
    category: "care-products",
    manufacturer: "bed-head",
  },
];

/** Производители для фильтра */
export const MANUFACTURERS: Manufacturer[] = [
  { id: "bed-head", name: "Bed Head for Men" },
  { id: "homme-deep", name: "Homme Deep Cleansing Cool" },
  { id: "so-intense", name: "So Intense" },
  { id: "sprekenhus", name: "Sprekenhus" },
  { id: "firm-store", name: "Firm Store" },
  { id: "winter-body", name: "Winter Body" },
];

/** Группы товаров для фильтра */
export const PRODUCT_GROUPS: ProductGroup[] = [
  { id: "shaving-supplies", name: "Бритвенные принадлежности" },
  { id: "care-products", name: "Средства для ухода" },
  { id: "accessories", name: "Аксессуары" },
];

/** Варианты сортировки */
export const SORT_OPTIONS: SortOption[] = [
  { value: "popular", label: "Сначала популярное" },
  { value: "cheap", label: "Сначала дешёвое" },
  { value: "expensive", label: "Сначала дорогое" },
];
