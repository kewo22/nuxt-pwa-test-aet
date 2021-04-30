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
          @keyup="onSearchKeyUp"
        ></v-text-field>
      </div>
      <div class="d-flex flex-column order-list-wrapper">
        <v-tabs
          centered
          background-color="transparent"
          class="tab-header"
          v-model="tabs"
        >
          <v-tab @click="onNewTabClick(0)"> New ({{ newOrders.length }})</v-tab>
          <v-tab @click="onInProgressTabClick(1)">
            In Progress ({{ inProgressOrders.length }})</v-tab
          >
          <v-tab @click="onFinishedTabClick(2)">
            Finished ({{ finishedOrders.length }})</v-tab
          >
        </v-tabs>

        <v-tabs-items class="tab-items" v-model="tabs">
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <div v-if="newOrders.length">
                  <OrderQueueItem
                    class="mb-2"
                    v-for="newOrder in newOrders"
                    :class="
                      `mb-2 ${newOrder.cancelled &&
                        `cancelled-order`} ${selectedOrder &&
                        selectedOrder.order_id === newOrder.order_id &&
                        `selected new`}`
                    "
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
          </v-tab-item>
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <div v-if="inProgressOrders.length">
                  <OrderQueueItem
                    class="mb-2"
                    v-for="newOrder in inProgressOrders"
                    :class="
                      `mb-2 ${newOrder.cancelled &&
                        `cancelled-order`} ${selectedOrder &&
                        selectedOrder.order_id === newOrder.order_id &&
                        `selected`}`
                    "
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
          </v-tab-item>
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <div v-if="finishedOrders.length">
                  <OrderQueueItem
                    class="mb-2"
                    v-for="newOrder in finishedOrders"
                    :class="
                      `mb-2 ${newOrder.cancelled &&
                        `cancelled-order`} ${selectedOrder &&
                        selectedOrder.order_id === newOrder.order_id &&
                        `selected finished`}`
                    "
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
      tempNewOrders: [],
      tempInProgressOrders: [],
      tempFinishedOrders: [],
      allOrders: [],
      tempOrders: [],
      currentTab: 0,
      searchVal: "",
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const orders = await this.$axios.$get("http://localhost:3004/orders");
      this.allOrders = orders;
      this.tempOrders = orders;
      const newOrders = orders.filter((order) => {
        return order.status === "new";
      });
      this.newOrders = newOrders;
      this.tempNewOrders = newOrders;
      const inProgressOrders = orders.filter((order) => {
        return order.status === "in progress";
      });
      this.inProgressOrders = inProgressOrders;
      this.tempInProgressOrders = inProgressOrders;
      const finishedOrders = orders.filter((order) => {
        return order.status === "finished";
      });
      this.finishedOrders = finishedOrders;
      this.tempFinishedOrders = finishedOrders;
      this.selectedOrder = this.newOrders[0];
    },
    onNewOrderClick(order) {
      this.selectedOrder = order;
    },
    onNewTabClick(e) {
      this.currentTab = 0;
      this.selectedOrder = this.newOrders[0];
    },
    onInProgressTabClick(e) {
      this.currentTab = 1;
      this.selectedOrder = this.inProgressOrders[0];
    },
    onFinishedTabClick(e) {
      this.currentTab = 2;
      this.selectedOrder = this.finishedOrders[0];
    },
    onSearchKeyUp(e) {
      this.searchVal = e.target.value;
      if (this.currentTab === 0) {
        if (this.searchVal) {
          const filteredNewOrders = this.tempNewOrders.filter((order) => {
            // return order.order_id === searchVal;
            return order.order_id.includes(this.searchVal);
          });
          this.newOrders = filteredNewOrders;
          if (filteredNewOrders.length === 1)
            this.selectedOrder = filteredNewOrders[0];
        } else {
          this.newOrders = this.tempNewOrders;
          this.selectedOrder = this.newOrders[0];
        }
      }
      if (this.currentTab === 1) {
        if (this.searchVal) {
          const filteredInprogressOrders = this.tempInProgressOrders.filter(
            (order) => {
              // return order.order_id === searchVal;
              return order.order_id.includes(this.searchVal);
            }
          );
          this.inProgressOrders = filteredInprogressOrders;
          if (filteredInprogressOrders.length === 1)
            this.selectedOrder = filteredInprogressOrders[0];
        } else {
          this.inProgressOrders = this.tempInProgressOrders;
          this.selectedOrder = this.inProgressOrders[0];
        }
      }
      if (this.currentTab === 2) {
        if (this.searchVal) {
          const filteredFinishedOrders = this.tempFinishedOrders.filter(
            (order) => {
              // return order.order_id === searchVal;
              return order.order_id.includes(this.searchVal);
            }
          );
          this.finishedOrders = filteredFinishedOrders;
          if (filteredFinishedOrders.length === 1)
            this.selectedOrder = filteredFinishedOrders[0];
        } else {
          this.finishedOrders = this.tempFinishedOrders;
          this.selectedOrder = this.finishedOrders[0];
        }
      }
    },
    calculatePickupTime(orders) {
      for (let i = 0; i < orders.length; i++) {
        var pos_fulfilment_time = moment(orders[i].pos_fulfilment_time);
        var today = moment();
        var pickupTimeInMinutes = pos_fulfilment_time.diff(today, "minutes");

        var pickupTime;
        // var pickupTimeWithSeconds;

        var h = Math.floor(pickupTimeInMinutes / 60);
        var m = Math.floor(pickupTimeInMinutes % 60);
        // var s = Math.floor(m / 60);

        if (h != 0) {
          if (h < 0) {
            h++;
            if (h == 0) {
              pickupTime = m + " Min";
            } else {
              pickupTime = h + " hr " + m + " Min";
            }
          } else {
            pickupTime = h + " hr " + m + " Min";
          }
        } else {
          pickupTime = m + " Min";
        }


        // h != 0
        //   ? (pickupTimeWithSeconds = h + " hr " + m + " Min " + s + " Seconds")
        //   : (pickupTimeWithSeconds = m + " Min" + s + " Seconds");

        orders[i].pickupTime = pickupTime;
        // orders[i].pickupTimeWithSeconds = pickupTimeWithSeconds;
      }
      return orders;
    },
    findOrderArray(orderStatus) {
      switch (orderStatus) {
        case "in progress":
          return "inProgressOrders";
        case "finished":
          return "finishedOrders";
        default:
          return "newOrders";
      }
    },
    orderStatusChange(order, nextState) {
      const { status } = order;
      const fromOrderArrayName = this.findOrderArray(status);
      const toOrderArrayName = this.findOrderArray(nextState);
      // from
      this[fromOrderArrayName] = this[fromOrderArrayName].filter(
        ord => order.order_id !== ord.order_id
      );
      // to
      this[toOrderArrayName] = [
        { ...order, status: nextState },
        ...this[toOrderArrayName]
      ];
      this.selectedOrder = this[fromOrderArrayName][0];
    }
  }
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

.v-card-text {
  height: 100%;
}

.no-search-result {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>