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

## Local Mock data API

> Defined Mock API endpoints and responses follow [Order Pro - API Design](https://lineten.atlassian.net/wiki/spaces/AET/pages/2365227197/Order+Pro+-+API+Design) document.

Start local mock API using the following command.

`npm run dev:data`

> Local server will be running on the [`http://localhost:3004`](http://localhost:3004).



### **USER PROFILE SERVICE API**

|API name|HTTP VERB|Endpoint format|
|-|-|-|
|User profile details|GET|/user/{userId} <br> ex: http://localhost:3004/user/1 |


### **SITE SERVICE API**
|API name|HTTP VERB|Endpoint format|
|-|-|-|
|List of Marketplaces for specific site of client|GET|/client/{id}/site/{id}/marketplaces <br> ex: http://localhost:3004/client/1/site/1/marketplaces|

### **ORDER SERVICE API**

|API name|HTTP VERB|Endpoint format|
|-|-|-|
|List of orders for today for specific site of client|GET|/client/{id}/site/{id}/orders/today <br> ex: http://localhost:3004/client/1/site/2323/orders/today|
|List of orders for after given time period for specific site of client|GET|/client/{id}/orders/site/{id}/recent/{timestamp} <br> ex: http://localhost:3004/client/1/orders/site/2323/recent/2021-08-21

### **SNOOZE SERVICE API**
TBD

### **MENU SERVICE API**
TBD

### **CLIENT SERVICE API**
TBD

### ***Default API endpoints***

|API NAME|HTTP VERB|URL|
|-|-|-|
|All Sites/locations|GET|http://localhost:3004/location|
|Specific Site/location|GET|http://localhost:3004/location/{id}|
|All marketplaces|GET|http://localhost:3004/marketplaces|
|Specific marketplace|GET|http://localhost:3004/marketplaces/{id}|
|All orders|GET|http://localhost:3004/orders|
|Specific order|GET|http://localhost:3004/orders/{id}|


```bash
# mock data running in port - 3004 - 
$ npm run dev:data
# or
$ npm i json-server
$ json-server --watch db.json --port 3004
* Example
  * http://localhost:3004/location/{id} - location API
  * http://localhost:3004/marketplaces/{id} - marketplace API
  * http://localhost:3004/orders - orders API
  * id = 1 0r 2
```

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
    - [How to Add Client-Side Storage with Vue Part 2](https://medium.com/@mntlmaxi/make-your-vue-app-last-with-indexeddb-66f02708830e)