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
