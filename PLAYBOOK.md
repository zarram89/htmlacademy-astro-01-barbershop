Отличный запрос. Вот полный **playbook** — как начать проект с нуля, какие решения принимать и какие сниппеты использовать для каждой типовой задачи.

---

## 1. Старт проекта — пошагово

### Шаг 1: Создать проект

```bash
# Создать
npm create astro@latest my-project -- --template basics --typescript strict
cd my-project

# Установить продакшен-зависимости
npm install embla-carousel        # если будет слайдер

# Установить дев-зависимости
npm install -D \
  prettier prettier-plugin-astro \
  stylelint stylelint-config-standard stylelint-config-html \
  eslint eslint-plugin-astro \
  @astrojs/check
```

### Шаг 2: Настроить инструменты

**`tsconfig.json`** — path aliases сразу:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@data/*": ["src/data/*"],
      "@styles/*": ["src/styles/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

**`astro.config.mjs`**:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://my-site.ru",          // поменять
  trailingSlash: "never",
  build: { format: "directory" },
  prefetch: true,                       // для View Transitions
  experimental: { clientPrerender: true },
});
```

**`.prettierrc.mjs`**:

```js
export default {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  plugins: ["prettier-plugin-astro"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
```

### Шаг 3: Создать структуру папок

```bash
# Сразу создать всю структуру
mkdir -p src/{assets/images,components/icons,data,layouts,styles}
```

Итог:
```
src/
├── assets/images/     # сюда класть ВСЕ изображения
├── components/
│   ├── icons/         # сюда класть иконки как .astro компоненты
│   ├── Header.astro
│   └── ...
├── data/              # типизированный контент
│   ├── index.ts       # barrel-export
│   └── site.ts        # мета, контакты
├── layouts/
│   └── BaseLayout.astro
├── pages/             # страницы
├── styles/
│   ├── fonts.css      # @font-face
│   └── global.css     # CSS-переменные, reset
public/
├── fonts/             # woff2 файлы
└── images/            # только SVG/PNG которые НЕ оптимизируются
```

### Шаг 4: Создать data/site.ts — это база

```ts
export const SITE = {
  lang: "ru",
  title: "Название проекта",
  description: "Описание для SEO",
  url: "https://my-site.ru",
  author: "Имя",
  contacts: {
    phone: "+7 800 555-86-28",
    phoneClean: "+78005558628",         // для href="tel:"
    email: "info@example.ru",
    address: "Адрес",
  },
} as const;
```

### Шаг 5: Создать BaseLayout.astro

Скопировать из этого проекта как шаблон. Добавить:
- SEO/OG мета
- Preload шрифтов
- Skip link
- Header / Footer
- AuthModal (если нужна)
- `<ClientRouter />` (если нужны View Transitions)
- Проп `mainBackground` для фоновых изображений на `<main>`
- Проп `mainClass` для вариаций страниц

---

## 2. Типовые кейсы — конкретные примеры

### 🔹 Контентное изображение

Когда: **любая картинка, которая должна быть оптимизирована (WebP, lazy, responsive)**

```astro
---
import { Image } from "astro:assets";
import hero from "@assets/images/hero.jpg";
---

<Image
  src={hero}
  alt="Описание"
  width={460}
  height={290}
  loading="lazy"        // eager для первого экрана
  decoding="async"
/>
```

✅ Всегда клади изображения в `src/assets/images/` (не в `public/`).  
✅ `<Image />` сам сгенерирует WebP, хэш в URL (cache-busting).  
✅ Не пиши руками `<img src="/images/hero.jpg">` — Astro не оптимизирует то, что в `public/`.

---

### 🔹 Фоновое изображение

Когда: **нужен background-image на блоке/секции**

```astro
---
import { getImage } from "astro:assets";
import bgImage from "@assets/images/section-bg.jpg";

const optimizedBg = await getImage({ src: bgImage });
---

<!-- 1. Передать URL через inline style -->
<section style={`background-image: url("${optimizedBg.src}")`} class="hero">
```

Если фон на `<main>` — передать через проп в BaseLayout:

```astro
---
// В page: index.astro
const optimizedBg = await getImage({ src: bgImage });
---
<BaseLayout mainClass="main-index" mainBackground={optimizedBg.src}>
```

```astro
---
// В BaseLayout.astro (уже готово)
<main
  style={mainBackground ? `background-image: url("${mainBackground}")` : undefined}
>
```

```css
/* Позиционирование и размер — в CSS */
.main-index {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

**🚫 Не делай так:**
```astro
<!-- НЕ РАБОТАЕТ — Astro не интерполирует JS в <style> -->
<style is:inline>
  .main-index {
    background-image: url("${optimizedBg.src}");
  }
</style>
```

✅ Фоновые свойства (size, position, repeat) — в CSS.  
✅ URL — только через `style` атрибут.  
✅ Второй вариант: `<style define:vars={{ bgUrl: optimizedBg.src }}>` — работает, но `style` атрибут проще.

---

### 🔹 Иконка

Когда: **SVG-иконка, которая может менять размер/цвет**

Создать файл `src/components/icons/TelegramIcon.astro`:

```astro
---
export interface Props {
  size?: number;
}

const { size = 16 } = Astro.props;
---

<svg
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="currentColor"
  aria-hidden="true"
  focusable="false"
>
  <path d="M6.8 10.8..." />
</svg>
```

Использовать:

```astro
<TelegramIcon size={20} />
```

✅ `fill="currentColor"` — цвет наследуется от родительского `color`.  
✅ Не надо дублировать SVG в каждом месте.  
✅ Tree-shaking — в бандл попадут только использованные иконки.  
✅ Если иконки однотипные — сделать `NavIcon.astro`-диспетчер:

```astro
---
import SearchIcon from "./icons/SearchIcon.astro";
import CartIcon from "./icons/CartIcon.astro";

const { name, size = 16 } = Astro.props;
---

{name === "search" && <SearchIcon size={size} />}
{name === "cart" && <CartIcon size={size} />}
```

**Когда НЕ надо компонент:** SVG не меняется, один экземпляр — можно просто вписать в разметку. Но если используется в 2+ местах — выноси в компонент.

---

### 🔹 Иконки соцсетей в футере (сложнее)

```astro
<footer>
  <ul class="social-list">
    <li>
      <a href="#" aria-label="Telegram">
        <TelegramIcon size={16} />
      </a>
    </li>
  </ul>
</footer>
```

✅ `aria-label` для доступности.  
✅ В CSS — `background-color: #000` и `:hover` меняет фон. Иконка наследует цвет через `fill="currentColor"`.

---

### 🔹 Форма с валидацией

```astro
<form class="my-form" novalidate>
  <div class="field-group">
    <label for="phone">Телефон</label>
    <input type="tel" id="phone" name="phone" required />
    <p class="error" aria-live="polite"></p>
  </div>

  <button type="submit">Отправить</button>
  <p class="form-message visually-hidden" aria-live="polite"></p>
</form>

<script>
  const form = document.querySelector(".my-form");
  // ...валидация, маска телефона, loading/success/error
  // Если нет адаптера — имитация через setTimeout
</script>
```

✅ `novalidate` — отключает браузерную валидацию (чтобы кастомная работала).  
✅ `aria-live="polite"` — screen reader прочитает сообщение.  
✅ Всегда показывать: loading → success/error.  
✅ Маска телефона делается через `input` event + регулярки.  

**Когда выносить в компонент:** если форма сложная (>100 строк скрипта) или повторяется на нескольких страницах. Если простая — можно прямо в странице.

---

### 🔹 Слайдер / Карусель

```bash
npm install embla-carousel
```

```astro
<div class="slider__viewport">
  <div class="slider__container">
    {items.map((item) => (
      <div class="slider__slide">
        <Image src={item.img} ... />
      </div>
    ))}
  </div>
</div>

<button class="slider__button--prev">Prev</button>
<button class="slider__button--next">Next</button>

<div class="slider__dots">
  {items.map((_, i) => (
    <button class="slider__dot" data-index={i} />
  ))}
</div>

<script>
  import EmblaCarousel from "embla-carousel";
  const embla = EmblaCarousel(viewport, { loop: true });
  prevBtn.addEventListener("click", () => embla.scrollPrev());
  nextBtn.addEventListener("click", () => embla.scrollNext());
  embla.on("select", updateDots);
</script>

<style>
  .slider__viewport { overflow: hidden; }
  .slider__container { display: flex; }
  .slider__slide { flex: 0 0 100%; min-width: 0; }
</style>
```

✅ Embla — 12KB минифицированных, никаких зависимостей.  
✅ Loop, dots, keyboard — всё ручками, но это 20 строк кода.  
✅ Не тащи Swiper/Glide — они тяжелее.

---

### 🔹 Модальное окно

```astro
<div class="modal-container modal-container--closed" id="my-modal" aria-hidden="true">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button class="modal-close" data-modal-close>
      <CloseIcon size={16} />
    </button>
    <h2 id="modal-title">Заголовок</h2>
    ...
  </div>
</div>

<script>
  const modal = document.getElementById("my-modal");
  const trigger = document.querySelector("[data-modal-open]");
  const closeBtn = modal.querySelector("[data-modal-close]");

  function open() {
    modal.classList.remove("modal-container--closed");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() {
    modal.classList.add("modal-container--closed");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  trigger?.addEventListener("click", (e) => { e.preventDefault(); open(); });
  closeBtn?.addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
</script>
```

✅ Три способа закрыть: кнопка, оверлей, Escape.  
✅ `aria-hidden` переключается.  
✅ `body.style.overflow = "hidden"` — запрет скролла под модалкой.  
✅ Не надо библиотек — 30 строк кода.

---

### 🔹 Data-слой (типизированный контент)

```ts
// src/data/services.ts
export interface Service {
  id: string;
  name: string;
  price: number;
}

export const SERVICES: Service[] = [
  { id: "cut", name: "Стрижка", price: 1000 },
  { id: "shave", name: "Бритьё", price: 500 },
];
```

```ts
// src/data/index.ts — barrel export
export { SERVICES } from "./services";
export type { Service } from "./services";
```

```astro
---
import { SERVICES } from "@data/services";
---

<ul>
  {SERVICES.map((item) => <li>{item.name} — {item.price}₽</li>)}
</ul>
```

**Когда выносить в data/:** любой структурированный контент — услуги, товары, отзывы, команда, навигация.  
**Когда НЕ надо:** если это уникальный текст для одной страницы («О компании»).

---

### 🔹 CSS-переменные для кастомизации компонента

Компонент не знает, где будет использоваться. Даём родителю контроль через `var()`:

```astro
---
<!-- Parent -->
<div class="index-columns" style="--card-width: 390px">
  <Card />
</div>
---

<!-- Card.astro -->
<style>
  .card {
    width: var(--card-width, 300px);
  }
</style>
```

✅ Чем отличается от пропса: CSS-переменные работают и при скролле, и в `:hover`, и для вложенных элементов. Пропсы — только для Astro-рендера.

---

### 🔹 View Transitions (SPA-навигация)

```astro
---
// astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({
  prefetch: true,                   // предзагрузка ссылок
});

// BaseLayout.astro (один раз)
import ClientRouter from "astro/components/ClientRouter.astro";
<ClientRouter />
```

Теперь навигация между страницами — без полной перезагрузки. Работает «бесплатно», без настроек.

---

### 🔹 404 страница

```astro
---
// src/pages/404.astro
import BaseLayout from "@layouts/BaseLayout.astro";
---

<BaseLayout title="404 — Страница не найдена" noindex={true}>
  <h1>404</h1>
  <p>Такой страницы нет</p>
  <a href="/">На главную</a>
</BaseLayout>
```

✅ `noindex={true}` — чтобы 404 не попала в поиск.  
✅ Astro сам отдаст её на любой несуществующий URL (статический хостинг).

---

### 🔹 Карточка товара с оптимизированным изображением

```astro
---
import { Image } from "astro:assets";
import type { ImageMetadata } from "astro";

export interface Props {
  name: string;
  price: number;
  image: ImageMetadata;       // важно — не string, а импортированный модуль
}

const { name, price, image } = Astro.props;
---

<article class="product-card">
  <a href="#">
    <Image src={image} alt="" width={220} height={200} loading="lazy" />
  </a>
  <h3>{name}</h3>
  <span>{price} ₽</span>
  <button>Купить</button>
</article>
```

**Как передать данные:**

```astro
---
import cat1 from "@assets/images/catalog/1.jpg";
import { PRODUCTS } from "@data/catalog";
---

{PRODUCTS.map((product) => {
  const imgMap = { "/images/catalog/1.jpg": cat1 };
  return <ProductCard image={imgMap[product.image]} ... />
})}
```

А ещё лучше — поместить импорты прямо в data-файл (как мы сделали с gallery.ts):

```ts
import img1 from "@assets/images/catalog/1.jpg";

export const PRODUCTS = [
  { id: "1", name: "...", price: 744, image: img1 },
];
```

Тогда `<Image src={product.image}>` — напрямую.

---

## 3. Production Checklist — перед деплоем

Когда проект готов, пройди по списку:

### Код
- [ ] TypeScript strict mode, нет `any`, нет ошибок `astro check`
- [ ] Все данные в `src/data/`, а не в разметке
- [ ] Все изображения в `src/assets/`, используются через `<Image />` или `getImage()`
- [ ] Нет `<style is:inline>` с JS-интерполяцией — только inline `style` атрибут
- [ ] Нет JS-бандла на страницах без интерактива (проверить в Network DevTools)

### Доступность (a11y)
- [ ] Skip link (`<a href="#main-content">`)
- [ ] `aria-label` на иконках
- [ ] `aria-hidden="true"` на декоративных SVG
- [ ] `alt` на всех `<img>` (пустой `alt=""` — ок для декоративных)
- [ ] Формы: `aria-live="polite"` на сообщениях об ошибках
- [ ] Модалка: `aria-modal`, `aria-labelledby`, `aria-hidden` переключается
- [ ] Focus management (Escape закрывает модалку)

### SEO
- [ ] `<title>` на каждой странице
- [ ] `<meta name="description">`
- [ ] Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] `lang` атрибут на `<html>`
- [ ] Нет дублей `noindex` на важных страницах
- [ ] 404 страница

### Performance
- [ ] WebP для всех изображений (Astro делает сам)
- [ ] `loading="lazy"` для изображений ниже «первого экрана»
- [ ] `fetchpriority="high"` для LCP-изображения (если нужно)
- [ ] Шрифты: `font-display: swap` + `<link rel="preload">` в шапке
- [ ] View Transitions (ClientRouter) — включены
- [ ] Build: `npx astro build` без ошибок

### Код-стайл
- [ ] ESLint — без ошибок
- [ ] Stylelint — без ошибок (BEM, no `!important`, max nesting)
- [ ] Prettier — отформатировано
- [ ] BEM-именование классов везде

### Последние проверки
- [ ] `npx astro check` — 0 errors
- [ ] `npm run build` — успешно
- [ ] `npx serve dist` — открыть в браузере, проверить все страницы
- [ ] Проверить 404.html (открыть `/random-page`)
- [ ] Проверить form submit (должен показать success/error)

---

## 4. Roadmap принятия решений (что выбрать)

| Задача | Выбор | Почему |
|--------|-------|--------|
| Изображение | `<Image />` из `src/assets/` | WebP, lazy, cache-busting |
| Фон | `getImage()` + inline `style` | Только так работает оптимизация |
| Иконка | SVG-компонент в `src/components/icons/` | Переиспользование, tree-shaking, `fill="currentColor"` |
| Карусель | Embla Carousel (12KB) | Легче Swiper в 10 раз |
| Модалка | Vanilla JS, 30 строк | Не нужна библиотека |
| Форма с валидацией | Vanilla JS, `novalidate`, `aria-live` | Проще и легче любой библиотеки |
| Данные | `src/data/` с интерфейсами | Замена на CMS = замена импорта |
| Стили | Scoped `<style>` + BEM + CSS vars | Изоляция, нет конфликтов |
| Интерактив | `<script>` без фреймворка | 0 KB JS на статичных страницах |
| SPA-навигация | `<ClientRouter />` | Бесплатно из коробки Astro |
| Хостинг | Cloudflare Pages / Netlify / Vercel | Бесплатный статический хостинг |
| Адаптер для API | `@astrojs/netlify` или `@astrojs/vercel` | Когда понадобятся серверные роуты |

---

**Главный принцип всего этого подхода:** *не тащить лишнего*. Если задача решается 30 строками нативного JS — не ставь React. Если изображение можно оптимизировать одной строчкой `<Image />` — не оставляй `public/`. Каждое решение в этой таблице — минимально достаточное для продакшена и максимально простое для поддержки.
