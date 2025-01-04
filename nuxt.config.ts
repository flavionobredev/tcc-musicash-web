// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Música SH",
      meta: [
        {
          name: "theme-color",
          content: "#111827",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "https://comshalom.org/wp-content/uploads/2017/10/sh.png",
          sizes: "180x180",
        },
        {
          rel: "apple-touch-icon",
          href: "https://comshalom.org/wp-content/uploads/2017/10/sh.png",
        },
      ],
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/base.css"],
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  tailwindcss: {
    disableHMR: true,
  },
  imports: {
    dirs: ["composables/**"],
  },
});
