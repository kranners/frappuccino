import wikilinks from "markdown-it-wikilinks";
import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Frappuccino",
  description: "For everything I end up Googling",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Promises", link: "/Promises" },
      { text: "Arrays", link: "/Arrays" },
    ],

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
  markdown: {
    config: (md) => {
      md.use(
        wikilinks({
          baseURL: "/",
          generatePagePathFromLabel: (label) => label.replace(/\s/g, "%20"),
        })
      );
    },
  },
});
