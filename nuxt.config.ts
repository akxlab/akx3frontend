// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        API_URL: process.env.NUXT_APP_PROVIDER_HOST,
        public: {
            NETWORK_ID:'0x13881'
        }
    },
    css: ['vuetify/lib/styles/main.sass', 'mdi/css/materialdesignicons.min.css'],
    build: {
      transpile: ['vuetify', '@ethersproject'],
    },
    vite: {
        optimizeDeps: {
            include: ['bn.js', 'js-sha3', 'hash.js', 'aes-js', 'scrypt-js', 'bech32']
          },
      define: {
        'process.env.DEBUG': false,
      },
    }
})
