import { useStringTransformer } from "../../internal/vite/plugins/plugin.string-transformer";
import { useIsolatedAlias } from "../../internal/vite/plugins/plugin.isolated-aliases";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      DEMO_CONTRACT_ADDRESS: process.env.DEMO_CONTRACT_ADDRESS,
    },
  },

  components: {
    global: true,
    dirs: [
      {
        path: "~/components/pages",
        pathPrefix: false,
        prefix: "Scoped",
        extensions: [".vue"],
        global: false,
      },
      {
        path: "~/components",
        pathPrefix: false,
        extensions: [".vue"],
        global: false,
      },
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  googleFonts: {
    families: {
      Philosopher: {
        wght: [400, 700],
        ital: [400, 700],
      },
      Roboto: {
        wght: [400, 500, 600, 700, 800, 900],
        ital: [400, 500, 600, 700, 800, 900],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '~/scss/variables.scss';
            @import '~/scss/typography/index.scss';
            @import '~/scss/adaptive/adaptive.create-container.scss';
            @import '~/scss/adaptive/adaptive.mixins.scss';
          `,
        },
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      dedupe: ["vue"],
      alias: {
        util: "util/",
      },
    },
    plugins: [
      useIsolatedAlias({
        modules: [
          {
            name: "Re-worked internal packages",
            repositoryDirectories: ["dto", "configs", "vite"],
            workspaceDirectory: "internal",
          },
        ],
        relativePathToProjectRoot: "../../",
        hasSrc: false,
      }),
      useStringTransformer({
        SERVER_API_ENDPOINT: () => {
          return process.env.SERVER_API_ENDPOINT;
        },
      }),
    ],
  },

  modules: [
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "./modules/module.safe-teleport-ui",
  ],
});