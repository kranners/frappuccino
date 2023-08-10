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
      { text: "About", link: "/About" },
      {
        text: "Changelog",
        link: "https://github.com/kranners/frappuccino/commits/main",
      },
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
  ignoreDeadLinks: true,
  markdown: {
    config: (md) => {
      md.use(
        wikilinks({
          baseURL: "/",
          postProcessPageName: (label) => label.trim().replace(/\s/g, "%20"),
        })
      );
    },
  },
});
