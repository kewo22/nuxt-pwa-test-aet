<template>
  <v-card class="v-card" flat>
    <v-card-text class="v-card-text">
      <div v-if="finishedOrders.length">
        <OrderQueueItem
          v-for="newOrder in finishedOrders"
          :class="`mb-2 ${newOrder.cancelled && `cancelled-order`} ${
            selectedOrder &&
            selectedOrder.order_id === newOrder.order_id &&
            `selected finished`
          }`"
          :key="`${newOrder.order_id}`"
          :item="newOrder"
          @orcerClick="onNewOrderClick(newOrder)"
        />
      </div>
      <div class="no-search-result" v-else>
        No orders found for ID -
        <span class="font-weight-black">&nbsp;{{ searchVal }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import OrderQueueItem from "./OrderQueueItem";
export default {
  components: { OrderQueueItem },
};
</script>