# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

Вот готовый **Cheat Sheet** — пошаговая инструкция, чтобы с нулевого `npm create astro` дойти до продакшен-шаблона за 5 минут.

---

## 🚀 Production-ready Astro template: пошаговый гайд

### Шаг 1. Создать проект

```sh
npm create astro@latest my-project -- --template minimal
cd my-project
```

---

### Шаг 2. Создать структуру папок

```sh
mkdir -p src/{components,layouts,pages,styles,data,assets}
```

---

### Шаг 3. Настроить алиасы путей — `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*":   ["src/layouts/*"],
      "@data/*":      ["src/data/*"],
      "@styles/*":    ["src/styles/*"],
      "@assets/*":    ["src/assets/*"]
    }
  }
}
```

---

### Шаг 4. Установить зависимости

```sh
npm install -D \
  eslint \
  @eslint/js \
  eslint-plugin-astro \
  typescript-eslint \
  prettier \
  prettier-plugin-astro \
  stylelint \
  stylelint-config-standard \
  stylelint-config-html \
  @astrojs/check \
  typescript
```

---

### Шаг 5. Настроить ESLint — `eslint.config.js`

```js
// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
);
```

---

### Шаг 6. Настроить Prettier — `.prettierrc.mjs`

```js
// @ts-check
/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};
```

И `.prettierignore`:

```
dist/
.astro/
node_modules/
package-lock.json
```

---

### Шаг 7. Настроить Stylelint — `.stylelintrc.json`

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-html"],
  "rules": {
    "no-descending-specificity": null,
    "color-named": "never",
    "declaration-no-important": true,
    "selector-max-id": 0,
    "max-nesting-depth": [2, { "ignoreAtRules": ["media"] }],
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
      { "message": "Expected BEM format (block__element--modifier)" }
    ],
    "import-notation": "string",
    "color-hex-length": "long"
  }
}
```

---

### Шаг 8. Обновить `package.json` — scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "lint": "eslint .",
    "lint:css": "stylelint \"src/**/*.{css,astro}\"",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

### Шаг 9. Обновить `astro.config.mjs` под продакшен

```js
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://your-site.com",
  trailingSlash: "never",
  build: { format: "directory" },
  prefetch: true,
});
```

---

### Шаг 10. Создать `src/styles/global.css`

```css
:root {
  --container-width: 940px;
  --container-padding: 20px;
  /* твои кастомные свойства */
}

*,
*::before,
*::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: ...;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img { display: block; max-width: 100%; height: auto; }
ul, ol { margin: 0; padding: 0; list-style: none; }
h1, h2, h3, h4, h5, h6, p { margin: 0; }
button { font: inherit; cursor: pointer; }

.visually-hidden { /* клип-райер */ }
```

---

### Шаг 11. Создать BaseLayout — `src/layouts/BaseLayout.astro`

```astro
---
import "@styles/global.css";

export interface Props {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

const { title = "Default", description = "Default", image = "/favicon.svg", noindex = false } = Astro.props;
---

<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, SITE.url).href} />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
  </head>
  <body>
    <main id="main-content">
      <slot />
    </main>
  </body>
</html>
```

---

### Шаг 12. Создать barrel-файл данных — `src/data/index.ts`

```ts
// Пример единого источника истины
export const SITE = { /* site config */ };
export const NAVIGATION = [ /* menu items */ ];
export const SERVICES = [ /* services with prices */ ];
export const TEAM = [ /* team members */ ];
```

---

### Шаг 13. Финальная проверка

```sh
npm run build       # ✅ сборка
npm run check       # ✅ TypeScript
npm run lint        # ✅ ESLint
npm run lint:css    # ✅ Stylelint
npm run format:check # ✅ Prettier
```

---

### Готово 🎯

Всё, что остаётся — писать компоненты в `src/components/`, раскладывать страницы в `src/pages/`, и управлять данными через `src/data/`. Никаких танцев с бубном вокруг тулинга.
