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
  modules: ["@nuxt/ui", "@pinia/nuxt" /*, "@vite-pwa/nuxt"*/],
  tailwindcss: {
    disableHMR: true,
  },
  imports: {
    dirs: ["composables/**"],
  },
  // pwa: {
  //   // workbox: {
  //   //   navigateFallback: "/",
  //   // },
  //   workbox: {

  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: "module",
  //   },
  //   registerType: "autoUpdate",
  //   includeAssets: [
  //     "apple-touch-icon-180x180.png",
  //     "favicon.ico",
  //     "maskable_icon-512x512.png",
  //     "pwa-64x64.png",
  //     "pwa-192x192.png",
  //     "pwa-512x512.png",
  //   ],
  //   // TODO: add apple icons
  //   manifest: {
  //     name: "Música SH",
  //     short_name: "MúsicaSH",
  //     description: "O APP do músico Shalom!",
  //     theme_color: "#111827",
  //     start_url: "/",
  //     icons: [
  //       {
  //         src: "pwa-64x64.png",
  //         sizes: "64x64",
  //         type: "image/png",
  //       },
  //       {
  //         src: "pwa-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //       },
  //       {
  //         src: "pwa-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "any",
  //       },
  //       {
  //         src: "maskable-icon-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "maskable",
  //       },
  //       {
  //         src: "apple-touch-icon-180x180.png",
  //         sizes: "180x180",
  //         type: "image/png",
  //       },
  //       {
  //         src: "favicon.ico",
  //         sizes: "64x64 32x32 24x24 16x16",
  //         type: "image/x-icon",
  //       },
  //     ],
  //   },
  // },
});
