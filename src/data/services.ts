export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  items: Service[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "haircut",
    name: "Стрижки",
    items: [
      {
        id: "haircut-mens",
        name: "Мужская стрижка",
        description: "Классическая или модельная стрижка машинкой и ножницами",
        price: 1500,
        duration: 40,
        category: "haircut",
      },
      {
        id: "haircut-kids",
        name: "Детская стрижка",
        description: "Стрижка для мальчиков до 12 лет",
        price: 1200,
        duration: 30,
        category: "haircut",
      },
      {
        id: "haircut-model",
        name: "Модельная стрижка",
        description: "Стрижка с укладкой и фиксацией",
        price: 2000,
        duration: 50,
        category: "haircut",
      },
    ],
  },
  {
    id: "beard",
    name: "Борода и усы",
    items: [
      {
        id: "beard-trim",
        name: "Стрижка бороды",
        description: "Оформление бороды, коррекция формы, подбривание",
        price: 1000,
        duration: 25,
        category: "beard",
      },
      {
        id: "beard-complete",
        name: "Бритьё опасной бритвой",
        description: "Классическое бритьё с горячим компрессом и лосьоном",
        price: 1500,
        duration: 40,
        category: "beard",
      },
      {
        id: "beard-deluxe",
        name: "Королевское бритьё",
        description: "Премиальное бритьё с паром, маслами и финальным компрессом",
        price: 2500,
        duration: 60,
        category: "beard",
      },
    ],
  },
  {
    id: "combo",
    name: "Комплексы",
    items: [
      {
        id: "combo-haircut-beard",
        name: "Стрижка + Борода",
        description: "Полный образ: стрижка и оформление бороды",
        price: 2200,
        duration: 60,
        category: "combo",
      },
      {
        id: "combo-all",
        name: "Джентльменский набор",
        description: "Стрижка, бритьё, борода — максимальное преображение",
        price: 3500,
        duration: 90,
        category: "combo",
      },
    ],
  },
];

export const ALL_SERVICES: Service[] = SERVICE_CATEGORIES.flatMap((cat) => cat.items);
