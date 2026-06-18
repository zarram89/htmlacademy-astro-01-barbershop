export interface Advantage {
  id: string;
  title: string;
  description: string;
}

export const ADVANTAGES: Advantage[] = [
  {
    id: "fast",
    title: "Быстро",
    description:
      "Мы делаем свою работу быстро! Два часа пролетят незаметно и вы — счастливый обладатель стильной стрижки-минутки!",
  },
  {
    id: "cool",
    title: "Круто",
    description:
      "Забудьте, как вы стриглись раньше. Мы сделаем из вас звезду футбола или кино! Во всяком случае внешне.",
  },
  {
    id: "expensive",
    title: "Дорого",
    description:
      "Наши мастера — профессионалы своего дела и не могут стоить дешево. К тому же, разве цена не дает определенный статус?",
  },
];
