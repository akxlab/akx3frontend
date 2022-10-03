import '@mdi/font/scss/materialdesignicons.scss' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ThemeDefinition } from 'vuetify'




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