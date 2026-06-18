export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface Contacts {
  phone: string;
  /** Номер без пробелов и дефисов для href="tel:" */
  phoneClean: string;
  email: string;
  address: string;
}

/** Часы работы: день и время */
export interface WorkingHours {
  day: string;
  hours: string;
}

export const SITE = {
  name: "Barbershop",
  title: "Барбершоп «Бородинский»",
  description:
    "Барбершоп «Бородинский» — это профессиональное мужское пространство в центре города. Стрижки, бритьё, уход за бородой и усами.",
  url: "https://barbershop.ru",
  lang: "ru",
  author: "HTML Academy",
  contacts: {
    phone: "+7 800 555-86-28",
    phoneClean: "+78005558628",
    email: "info@barbershop.ru",
    address: "Санкт-Петербург, набережная реки Карповки, 5, литера П.",
  } satisfies Contacts,
  workingHours: [
    { day: "пн—пт", hours: "с 10:00 до 22:00" },
    { day: "сб—вс", hours: "с 10:00 до 19:00" },
  ] satisfies WorkingHours[],
} as const;
