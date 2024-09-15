import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { WagmiPlugin } from "@wagmi/vue";
import { config } from "~/configs/configs.wagmi";

export default defineNuxtPlugin((NuxtApp) => {
  const queryClient = new QueryClient();

  NuxtApp.vueApp
    .use(WagmiPlugin, { config })
    .use(VueQueryPlugin, { queryClient });

  return {
    provide: {
      aos: () => "hello",
    },
  };
});
