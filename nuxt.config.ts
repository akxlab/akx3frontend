// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        API_URL: process.env.NUXT_APP_PROVIDER_HOST,
        SERVER_PROVIDER_URL: process.env.NUXT_APP_PROVIDER_URL,
        SERVER_PROVIDER_MUMBAI_URL: process.env.NUXT_APP_MUMBAI_URL,
        SERVER_PROVIDER_GOERLI_URL: process.env.NUXT_APP_GOERLI_URL,
        PRIVATE_KEY: process.env.NUXT_APP_PRIVATE_KEY,
        PRICE_API_URI: process.env.NUXT_APP_COINCAP_API,
        public: {
            NETWORK_ID:'0x13881',
            NETWORK_ETH: ''
        }
    },
    globalName: 'AKX3',
    css: ['vuetify/lib/styles/main.sass'],
   
    build: {
      transpile: ['vuetify', '@ethersproject'],
    },
    head: {
      link: [
        {rel: 'stylesheet', href:'https://use.typekit.net/tie2ewy.css'}
      ]
    },
    vite: {
        optimizeDeps: {
            include: ['bn.js', 'js-sha3', 'hash.js', 'aes-js', 'scrypt-js', 'bech32']
          },
      define: {
        'process.env.DEBUG': false,
      },
     
    },
    experimental: {
      reactivityTransform: true
    }
    
})
