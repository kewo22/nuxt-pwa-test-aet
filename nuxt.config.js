export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-pwa-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/idb.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pwa: {
    manifest: {
      start_ur: "/",
      theme_color: "#FF5734",
      display: "fullscreen",
      orientation: "portrait"
    },
    workbox: {
      importScripts: [
        'workers/custom.sw.js'
      ],
      runtimeCaching: [
        {
          // urlPattern: 'https://my-cdn.com/posts/.*',
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
