<template>
  <div class="d-flex fill-height orders-wrapper">
    <div class="d-flex flex-column section-1 mr-2 pa-2">
      <div>
        <v-text-field
          label="Search by ID"
          placeholder="Search by ID"
          solo
          dense
          height="30"
          class="search-input ml-auto"
        ></v-text-field>
      </div>
      <div class="d-flex flex-column order-list-wrapper">
        <v-tabs
          centered
          background-color="transparent"
          class="tab-header"
          v-model="tabs"
        >
          <v-tab> New </v-tab>
          <v-tab> In Progress </v-tab>
          <v-tab> Finished </v-tab>
        </v-tabs>

        <v-tabs-items class="tab-items" v-model="tabs">
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="">
                <div v-if="newOrders.length">
                  <OrderQueueItem
                    class="mb-2"
                    v-for="newOrder in newOrders"
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                    @orcerClick="onNewOrderClick(newOrder)"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text>
                <div v-if="inProgressOrders.length">
                  <OrderQueueItem
                    class="mb-2"
                    v-for="newOrder in inProgressOrders"
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text>
                <div v-if="finishedOrders.length">
                  <OrderQueueItem
                    class="mb-2"
                    v-for="newOrder in finishedOrders"
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>

    <div class="section-2 ml-2 pa-2">
      <OrderDetails v-if="selectedOrder" :order="selectedOrder" />
      <NoOrder v-else />
    </div>
  </div>
</template>

<script>
import OrderDetails from "~/components/orders/OrderDetails.vue";
import NoOrder from "~/components/orders/NoOrder.vue";
import OrderQueueItem from "~/components/orders/OrderQueueItem.vue";

export default {
  components: { OrderDetails, NoOrder, OrderQueueItem },
  data() {
    return {
      tabs: null,
      selectedOrder: null,
      newOrders: [],
      inProgressOrders: [],
      finishedOrders: [],
      allOrders: [],
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const orders = await this.$axios.$get("http://localhost:3004/orders");
      this.allOrders = orders;
      const newOrders = orders.filter((order) => {
        return order.status === "NEW";
      });
      this.newOrders = newOrders;
      const inProgressOrders = orders.filter((order) => {
        return order.status === "IN PROGRESS";
      });
      this.inProgressOrders = inProgressOrders;
      const finishedOrders = orders.filter((order) => {
        return order.status === "FINISHED";
      });
      this.finishedOrders = finishedOrders;
      this.selectedOrder = orders.orders[0];
    },
    onNewOrderClick(order) {
      // console.log(order);
      this.selectedOrder = order;
    },
  },
};
</script>

<style scoped>
.orders-wrapper {
  width: 100%;
}
.section-1 {
  flex: 1 0 50%;
}
.tab-header {
  flex: 0 0 8%;
}
.tab-items {
  flex-grow: 1;
  background-color: transparent;
  height: 100%;
  overflow: hidden;
}
.tab-item {
  background-color: transparent;
  height: 100%;
  overflow: hidden;
}
.order-list-wrapper {
  flex-grow: 1;
}
.section-2 {
  flex: 1 0 50%;
  background: aliceblue;
  color: black;
}
.search-input {
  width: 250px;
}

.v-card {
  height: 100%;
  overflow: hidden;
}
</style>