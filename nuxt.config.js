import path from 'path'
import fs from 'fs'
import colors from 'vuetify/es5/util/colors'

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
        '@/assets/css/global.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/pwa',
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/pwa',
        '@nuxtjs/axios'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    manifest: {
        name: 'Nuxt.js PWA survival store',
        short_name: 'Nuxt.js PWA',
        lang: 'en',
        display: 'standalone',
    },

    server: {
        port: 3001, // default: 3000
        // host: '0.0.0.0', // default: localhost,
        // timing: false,
        // https: {
        //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
        //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        // }
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
                    primary: colors.blue.lighten1,
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
}