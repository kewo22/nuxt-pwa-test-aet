<template>
  <div class="data-viz">
    <h2 class="title">SW Data Visualizer</h2>
    <div class="flex-1">
      <h3>Local Storage Data (Posts count: {{ localStorageData.length }})</h3>
      <post-list :posts="localStorageData" />
    </div>
    <div class="flex-1">
      <h3>Indexed DB Data (Posts count: {{ indexedDbData.length }})</h3>
      <post-list :posts="indexedDbData" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localStorageData: [{ id: 1, body: "hello" }],
      indexedDbData: [{ id: 2, body: "hello 1" }],
    };
  },
  async mounted() {

    const workbox = await window.$workbox;
    if (workbox) {
      console.log(`workbox loaded`);
      workbox.addEventListener("installed", (event) => {
        console.log(`workbox SW loaded`);
        // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
        if (event.isUpdate) {
          console.log(`workbox SW:EVT:Updated`);
          // whatever logic you want to use to notify the user that they need to refresh the page.
        }
      });

      const swVersion = await workbox.messageSW({ type: "GET_VERSION" });
      console.log("Service Worker version:", swVersion);

      const dbData = await workbox.messageSW({ type: "GET_POSTS_IDB" });
      console.log("SW:DB DATA", dbData);
      this.indexedDbData = dbData;
    }
  },
};
</script>

<style>
.data-viz {
  display: flex;
  flex-direction: column;
}
</style>