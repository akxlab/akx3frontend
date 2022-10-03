import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader



const AKXTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#009fe3',
    'primary-darken-1': '#347ed4',
    secondary: '#8d47ba'

  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    defaults: {
      global: {
       ripple: false,
      }
    },
    components,
    directives,
    theme: {
      defaultTheme: 'AKXTheme',
      themes: {
        AKXTheme,
      }
    }
  })



  nuxtApp.vueApp.use(vuetify)
})