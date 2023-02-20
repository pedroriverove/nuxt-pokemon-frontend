import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        //
      },
    },
    defaults: {
      VBtn: {
        rounded: 'md',
        flat: true,
        fontWeight: '400',
        letterSpacing: '0',
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
