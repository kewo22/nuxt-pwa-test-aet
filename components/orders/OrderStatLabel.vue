<template>
  <v-col class="order-stat right-border">
    <p class="stat-label">{{ label }}</p>
    <p :class="`stat-value ${valueStyle}`">{{ value }}</p>
  </v-col>
</template>


<style scoped>
.order-stat {
  height: 60px;
  padding: 0 15px;
}

.order-stat:first-child {
  padding-left: 0;
  flex: 1.5;
}

.right-border {
  border-right: #ccced0 solid 1px;
}

.right-border:last-child {
  border-right: none;
  padding-right: 0;
  flex: 2;
}

.stat-label {
  line-height: 20px;
  color: #9a9ca0;
  /* font-size: 18px; */
}

.stat-value {
  line-height: 10px;
  color: #2a343d;
  font-size: 25px;
  font-weight: bold;
}

.overdue {
  color: #e00000;
}
</style>

<script>
export default {
  props: ["label", "value", "valueStyle"],
};
</script>
