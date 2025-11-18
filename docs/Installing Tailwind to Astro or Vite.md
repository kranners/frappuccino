---
id: Installing Tailwind to Astro or Vite
date: "07 November, 2025"
---

# Installing Tailwind to Astro or Vite

Install with your package manager:
```shell
npm install -D tailwind @tailwindcss/vite
```

Add to your _astro.config.mjs_:
```mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

See [Install Tailwind CSS with Astro - Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/astro)
