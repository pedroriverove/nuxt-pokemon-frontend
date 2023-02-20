export default defineNuxtConfig({
  srcDir: 'src',
  app: {
    head: {
      title: 'Pokemon',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    },
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: [
      'vuetify',
    ]
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ]
})
