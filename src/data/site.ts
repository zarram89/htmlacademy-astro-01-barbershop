export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface Contacts {
  phone: string;
  email: string;
  address: string;
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
    phone: "+7 (812) 555-66-66",
    email: "info@barbershop.ru",
    address: "Санкт-Петербург, ул. Большая Конюшенная, д. 19/8",
  } satisfies Contacts,
  socials: [
    { label: "ВКонтакте", href: "#", icon: "vk" },
    { label: "Telegram", href: "#", icon: "telegram" },
    { label: "Instagram", href: "#", icon: "instagram" },
  ] satisfies Social[],
  workingHours: [
    { day: "Пн–Пт", hours: "10:00 – 20:00" },
    { day: "Сб–Вс", hours: "11:00 – 19:00" },
  ],
} as const;
