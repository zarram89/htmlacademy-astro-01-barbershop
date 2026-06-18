export interface Service {
  id: string;
  name: string;
  price: number;
}

/** Популярные услуги, показываемые на главной */
export const SERVICES: Service[] = [
  {
    id: "machine-cut",
    name: "Стрижка машинкой",
    price: 800,
  },
  {
    id: "mustache-trim",
    name: "Стрижка усов",
    price: 1200,
  },
  {
    id: "grooming",
    name: "Груминг",
    price: 400,
  },
  {
    id: "complex-cut",
    name: "Комплексная стрижка",
    price: 2300,
  },
];
