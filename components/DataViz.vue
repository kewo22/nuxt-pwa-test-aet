<template>
  <div class="data-viz">
    <h2 class="title">Data Visualizer</h2>
    <div class="flex-1">
      <h3>Local Storage Data</h3>
      <ul>
        <li v-for="(post, idx) in localStorageData" :key="idx">{{ post }}</li>
      </ul>
    </div>
    <div class="flex-1">
      <h3>Indexed DB Data</h3>
      <ul>
        <li v-for="(post, idx) in indexedDbData" :key="idx">{{ post }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localStorageData: ["hello"],
      indexedDbData: ["hello 1"],
    };
  },
};
</script>

<style>
.data-viz {
  display: flex;
  flex-direction: column;
}
</style>