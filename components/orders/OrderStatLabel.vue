<template>
  <v-col class="order-stat right-border">
    <p class="stat-label">{{ label }}</p>
    <p class="stat-value">{{ value }}</p>
  </v-col>
</template>


<style scoped>
.order-stat {
  height: 60px;
  padding: 0 15px;
}

.order-stat:first-child {
  padding-left: 0;
}

.right-border {
  border-right: #ccced0 solid 1px;
}

.right-border:last-child {
  border-right: none;
}

.stat-label {
  line-height: 24px;
  color: #9a9ca0;
  font-size: 1rem;
}

.stat-value {
  line-height: 36px;
  color: #2a343d;
  font-size: 30px;
}
</style>

<script>
export default {
  props: ["label", "value"],
};
</script>
