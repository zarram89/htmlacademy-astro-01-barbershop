export interface TeamMember {
  id: string;
  name: string;
  surname: string;
  photo: string;
  position: string;
  description: string;
  socials?: {
    vk?: string;
    instagram?: string;
  };
}

export const TEAM: TeamMember[] = [
  {
    id: "boris",
    name: "Борис",
    surname: "Иванов",
    photo: "/images/team/boris.jpg",
    position: "Старший барбер",
    description:
      "Основатель барбершопа. 10 лет в профессии, специалист по классическим стрижкам и опасной бритве.",
    socials: {
      vk: "#",
      instagram: "#",
    },
  },
  {
    id: "dmitry",
    name: "Дмитрий",
    surname: "Петров",
    photo: "/images/team/dmitry.jpg",
    position: "Барбер",
    description: "Мастер спортивных и модельных стрижек. Работает с любым типом волос.",
    socials: {
      instagram: "#",
    },
  },
  {
    id: "artem",
    name: "Артём",
    surname: "Сидоров",
    photo: "/images/team/artem.jpg",
    position: "Барбер",
    description: "Король бороды. Оформление, тримминг, уход — сделает любую форму идеальной.",
    socials: {
      vk: "#",
    },
  },
];
