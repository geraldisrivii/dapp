import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/google-fonts`
     */
    ["googleFonts"]: typeof import("@nuxtjs/google-fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@vee-validate/nuxt`
     */
    ["veeValidate"]: typeof import("@vee-validate/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `./../../modules/module.safe-teleport-ui`
     */
    ["Vue Safe Teleport UI"]: typeof import("./../../modules/module.safe-teleport-ui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/google-fonts`
     */
    ["googleFonts"]?: typeof import("@nuxtjs/google-fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@vee-validate/nuxt`
     */
    ["veeValidate"]?: typeof import("@vee-validate/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `./../../modules/module.safe-teleport-ui`
     */
    ["Vue Safe Teleport UI"]?: typeof import("./../../modules/module.safe-teleport-ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxtjs/google-fonts", Exclude<NuxtConfig["googleFonts"], boolean>] | ["@vee-validate/nuxt", Exclude<NuxtConfig["veeValidate"], boolean>] | ["./../../modules/module.safe-teleport-ui", Exclude<NuxtConfig["Vue Safe Teleport UI"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/google-fonts`
     * @see https://www.npmjs.com/package/@nuxtjs/google-fonts
     */
    ["googleFonts"]: typeof import("@nuxtjs/google-fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@vee-validate/nuxt`
     * @see https://www.npmjs.com/package/@vee-validate/nuxt
     */
    ["veeValidate"]: typeof import("@vee-validate/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `./../../modules/module.safe-teleport-ui`
     * @see https://www.npmjs.com/package/./../../modules/module.safe-teleport-ui
     */
    ["Vue Safe Teleport UI"]: typeof import("./../../modules/module.safe-teleport-ui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/google-fonts`
     * @see https://www.npmjs.com/package/@nuxtjs/google-fonts
     */
    ["googleFonts"]?: typeof import("@nuxtjs/google-fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@vee-validate/nuxt`
     * @see https://www.npmjs.com/package/@vee-validate/nuxt
     */
    ["veeValidate"]?: typeof import("@vee-validate/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `./../../modules/module.safe-teleport-ui`
     * @see https://www.npmjs.com/package/./../../modules/module.safe-teleport-ui
     */
    ["Vue Safe Teleport UI"]?: typeof import("./../../modules/module.safe-teleport-ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxtjs/google-fonts", Exclude<NuxtConfig["googleFonts"], boolean>] | ["@vee-validate/nuxt", Exclude<NuxtConfig["veeValidate"], boolean>] | ["./../../modules/module.safe-teleport-ui", Exclude<NuxtConfig["Vue Safe Teleport UI"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },
  }
  interface PublicRuntimeConfig {
   DEMO_CONTRACT_ADDRESS: string,

   API_URL: string,
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }