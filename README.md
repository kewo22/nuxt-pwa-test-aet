# nuxt-pwa-test

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Testing with Service Worker on localhost (local dev environment)

Run the following to start the local server with Service worker

```bash
$ npm run dev:sw
```
Run the following to start the local dev server with auto reloading the changes

```bash
$ npm run dev:sw:watch
```

*Note: 
Please create new custom service worker files ending with `.sw.js` in the `static/worker` directory.
and make sure to update the `workbox.importScripts` array on the [`nuxt.config.js`](#nuxt.config.js) file with the created worker file name.

# Reference

- PWA and Storage
    - [How to Create a Progressive Web App with Vue.js](https://javascript.plainenglish.io/how-to-create-a-progressive-web-app-with-vue-js-7086cbf87a43)
    - [Offline Web Apps: Using Local Storage and Service Workers.](https://medium.com/@onejohi/offline-web-apps-using-local-storage-and-service-workers-5d40467117b9)
    - [Nuxt PWA: workbox](https://pwa.nuxtjs.org/workbox)
    - [Workbox Strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
        - [Background sync](https://developers.google.com/web/tools/workbox/modules/workbox-background-sync)