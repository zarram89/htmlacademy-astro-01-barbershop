import type { ImageMetadata } from "astro";
import gallery1 from "@assets/images/gallery-1.jpg";
import gallery2 from "@assets/images/gallery-2.jpg";
import gallery3 from "@assets/images/gallery-3.jpg";
import gallery4 from "@assets/images/gallery-4.jpg";

export interface GalleryImage {
  /** Импортированное изображение для оптимизации через <Image /> */
  src: ImageMetadata;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: gallery1,
    alt: "Стрижка машинкой в барбершопе «Бородинский»",
  },
  {
    src: gallery2,
    alt: "Стрижка ножницами в барбершопе «Бородинский»",
  },
  {
    src: gallery3,
    alt: "Бритьё опасной бритвой в барбершопе «Бородинский»",
  },
  {
    src: gallery4,
    alt: "Укладка волос в барбершопе «Бородинский»",
  },
];
