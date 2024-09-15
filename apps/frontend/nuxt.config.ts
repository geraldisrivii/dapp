// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    // Config within public will be also exposed to the client
    public: {
      DEMO_CONTRACT_ADDRESS: process.env.DEMO_CONTRACT_ADDRESS,
    },
  },
});
