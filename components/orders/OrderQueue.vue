<template>
  <v-flex>
    <div class="no-search-result" v-if="!ordersQueue.length && !!searchVal">
      No orders found for ID -
      <span class="font-weight-black">&nbsp;{{ searchVal }}</span>
    </div>
    <div v-else>
      <OrdersOrderQueueItem
        v-for="order in ordersQueue"
        class="mb-2"
        :selected="selectedOrderID === order.order_id"
        :key="`${order.order_id}`"
        :item="order"
        v-on="$listeners"
      />
    </div>
  </v-flex>
</template>

<script>
export default {
  props: ["ordersQueue", "selectedOrderID", "searchVal"],
  methods: {
    onOrderClick(order) {
      this.$emit("orderClick", order);
    },
  },
};
</script>

<style scoped>
.no-search-result {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>