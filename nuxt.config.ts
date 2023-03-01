// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    repApiKey: '',
    strapiToken: '',
    strapiBase: '',
    matomoBase: '',
    matomoSiteId: '',
    imgServiceApiBase: '',
    imgServiceApiToken: '',
    sdVersion: '',
    public: {
      baseUrl: ''
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@vueuse/nuxt'
  ],
  imports: {
    dirs: ["stores", "prisma"]
  },
  nitro: {
    serverAssets: [{
      baseName: 'fonts',
      dir: './server/fonts'
    }]
  }
})
