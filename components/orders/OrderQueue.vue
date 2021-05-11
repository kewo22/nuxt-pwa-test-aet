<template>
  <div>
    <div class="no-search-result" v-if="!ordersQueue.length && !!searchVal">
      No orders found for ID -
      <span class="font-weight-black">&nbsp;{{ searchVal }}</span>
    </div>
    <div v-else>
      <OrdersOrderQueueItem
        v-for="order in ordersQueue"
        :class="`mb-2 ${order.cancelled && `cancelled-order`} ${
          selectedOrderID === order.order_id && `selected new`
        }`"
        :key="`${order.order_id}`"
        :item="order"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["ordersQueue", "selectedOrderID", "searchVal"],
  mounted() {
    console.log(this.selectedOrderID);
  },
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
.selected {
  border: 2px #509ad9 solid;
}
.new {
  border-color: #9d41b9;
}
.finished {
  border-color: #62a073;
}
.cancelled-order {
  border-color: #f09d00;
}
.overdue-order {
  border-color: #ff0000;
}
</style>