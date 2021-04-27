import colors from 'vuetify/es5/util/colors'
import { TokenAuthentication } from './constants';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Order Pro | Line10',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/currencyFormatter.client.js',
    '~/plugins/idb.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  auth: {
    strategies: {
      customStrategy: {
        scheme: '~/schemes/customScheme',
        endpoints: {
          login: { url: TokenAuthentication.TokenUrl, method: 'post' },
          user: { url: 'user/1', method: 'get', propertyName: 'auth_token' } // Mock (/api/users/{userId} will be correct endpoint)
        },
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  axios: {
    // proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    port: 8000 // default: 3000
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://localhost:3004/'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  pwa: {
    manifest: {
      name: 'Order Pro | Line Ten',
      short_name: 'Order Pro | L10',
      lang: 'en',
      start_ur: "/",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "landscape"
    },
    workbox: {
      importScripts: [
        'idb-sw.client.js',
        'workers/custom.sw.js'
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://jsonplaceholder.typicode.com/.*',
          strategyOptions: {
            cacheName: 'test-cache-v2',
          },
          strategyPlugins: [{
            use: 'BackgroundSync',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 3000
            }
          }]
        }
      ]
    }
  }

}
