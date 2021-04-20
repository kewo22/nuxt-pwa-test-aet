<template>
  <div class="data-viz">
    <h2 class="title">SW Data Visualizer</h2>
    <div class="flex-1">
      <h3>
        Local Storage Data (Posts count: {{ localStorageData.length }})
        <storage-quota :data="localStorageData" />
      </h3>
      <post-list :posts="localStorageData" />
    </div>
    <div class="flex-1">
      <h3>
        Indexed DB Data (Posts count: {{ indexedDbData.length }})
        <storage-quota :data="indexedDbData" />
      </h3>
      <post-list :posts="indexedDbData" />
    </div>
  </div>
</template>

<script>
import StorageQuota from "./StorageQuota.vue";
export default {
  components: { StorageQuota },
  data() {
    return {
      localStorageData: [],
      indexedDbData: [],
    };
  },
  async mounted() {
    const workbox = await window.$workbox;
    if (workbox) {
      const dbData = await workbox.messageSW({ type: "GET_POSTS_IDB" });
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