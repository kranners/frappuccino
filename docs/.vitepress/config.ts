import wikilinks from "markdown-it-wikilinks";
import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { alert } from "@mdit/plugin-alert";
import style from "@mdit/plugin-alert/style";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Frappuccino",
  description: "For everything I end up Googling",
  srcExclude: ['**/2024/**', '**/2025/**', '**/2026/**'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/cup.png",

    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/About" },
      {
        text: "Changelog",
        link: "https://github.com/kranners/frappuccino/commits/main",
      },
    ],

    outline: {
      level: [2, 6],
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' },
    },

    sidebar: generateSidebar({
      documentRootPath: "docs/",
    }),

    search: {
      provider: "local",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/kranners" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/aajrp" },
    ],

    externalLinkIcon: true,
  },
  ignoreDeadLinks: true,
  markdown: {
    container: {
      tipLabel: "Note"
    },
    config: (md) => {
      md.use(alert, { deep: true });

      md.use(
        wikilinks({
          baseURL: "/",
          postProcessPageName: (label: string) => label.trim().replace(/\s/g, "%20"),
        })
      )
    },
  },
});
