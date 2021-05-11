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
        <v-item-group v-model="tabs" class="shrink mr-6" mandatory tag="v-flex">
          <!-- <v-item v-for="n in length" :key="n" v-slot="{ active, toggle }">
            <div>
              <v-btn :input-value="active" icon @click="toggle">
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </div>
          </v-item> -->
          <v-item v-slot="{ active, toggle }">
            <v-btn :input-value="active" @click="toggle">
              New ({{ newOrderQueue.length }})
            </v-btn>
          </v-item>
          <v-item v-slot="{ active, toggle }">
            <v-btn :input-value="active" @click="toggle">
              In Progress ({{ inProgressQueue.length }})
            </v-btn>
          </v-item>
          <v-item v-slot="{ active, toggle }">
            <v-btn :input-value="active" @click="toggle">
              Finished ({{ finishedQueue.length }})
            </v-btn>
          </v-item>
        </v-item-group>

        <!-- <v-tab @click="onNewTabClick(0)">
            New ({{ newOrderQueue.length }})
          </v-tab>
          <v-tab @click="onInProgressTabClick(1)">
            In Progress ({{ inProgressQueue.length }})
          </v-tab>
          <v-tab @click="onFinishedTabClick(2)">
            Finished ({{ finishedQueue.length }})
          </v-tab> -->

        <v-window v-model="tabs" touchless>
          <!-- </v-window> -->

          <!-- <v-tabs-items class="tab-items" v-model="tabs"> -->
          <v-window-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <orders-order-queue 
                  :ordersQueue="newOrderQueue"
                  :selectedOrderID="(!!selectedOrder) ? selectedOrder.order_id : undefined"
                  :searchVal="searchVal"
                  @orderClick="onNewOrderClick"
                  @orderStatusChange="orderStatusChange"
                />
                <!-- <div
                  class="no-search-result"
                  v-if="!newOrderQueue.length && !!searchVal"
                >
                  No orders found for ID -
                  <span class="font-weight-black">&nbsp;{{ searchVal }}</span>
                </div>
                <div v-else>
                  <OrderQueueItem
                    v-for="newOrder in newOrderQueue"
                    :class="
                      `mb-2 ${newOrder.cancelled && `cancelled-order`} 
                    ${selectedOrder &&
                      selectedOrder.order_id === newOrder.order_id &&
                      `selected new`}`
                    "
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                    @orderClick="onNewOrderClick(newOrder)"
                    @orderStatusChange="orderStatusChange"
                  />
                </div> -->
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <div
                  class="no-search-result"
                  v-if="!inProgressQueue.length && !!searchVal"
                >
                  No orders found for ID -
                  <span class="font-weight-black">&nbsp;{{ searchVal }}</span>
                </div>
                <div v-else>
                  <OrderQueueItem
                    v-for="newOrder in inProgressQueue"
                    :class="
                      `mb-2 ${newOrder.cancelled && `cancelled-order`} 
                    ${newOrder.overdue && `overdue-order`}
                    ${selectedOrder &&
                      selectedOrder.order_id === newOrder.order_id &&
                      `selected`}`
                    "
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                    @orderClick="onNewOrderClick(newOrder)"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <div
                  class="no-search-result"
                  v-if="!finishedQueue.length && !!searchVal"
                >
                  No orders found for ID -
                  <span class="font-weight-black">&nbsp;{{ searchVal }}</span>
                </div>
                <div v-else>
                  <OrderQueueItem
                    v-for="newOrder in finishedQueue"
                    :class="
                      `mb-2 ${newOrder.cancelled &&
                        `cancelled-order`} ${selectedOrder &&
                        selectedOrder.order_id === newOrder.order_id &&
                        `selected finished`}`
                    "
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                    @orderClick="onNewOrderClick(newOrder)"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
          <!-- </v-tabs-items> -->
        </v-window>
      </div>
    </div>

    <div class="section-2 ml-2 pa-2">
      <OrderDetails
        v-if="selectedOrder"
        :order="selectedOrder"
        @orderStatusChange="orderStatusChange"
      />
      <NoOrder v-else />
    </div>
  </div>
</template>

<script>
import OrderDetails from "~/components/orders/OrderDetails.vue";
import NoOrder from "~/components/orders/NoOrder.vue";
import OrderQueueItem from "~/components/orders/OrderQueueItem.vue";
import moment from "moment";
import { mapGetters } from "vuex";
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
      leadTime: "",
      orders: [],
      settingData: ""
    };
  },
  watch:{
    tabs(newTab) {
      this.onTabClick(newTab);
    }
  },
  created() {
    this.$store.subscribe(mutation => {
      if (mutation.type === "orders/setSelectedOrders") {
        this.selectedOrder = this.$store.getters["orders/getNewStateOrders"][0];
      }
    });
  },
  async mounted() {
    let lastSyncTime = await this.$idb.get("lastSyncTime");
    let settingData = (await this.$idb.get("settingData")) || [];
    let selectedReloadInterval = settingData.selectedReloadInterval;

    selectedReloadInterval
      ? (selectedReloadInterval = selectedReloadInterval.split(" ")[1])
      : (selectedReloadInterval = 1);

    selectedReloadInterval = parseInt(selectedReloadInterval) * 60000;

    if (lastSyncTime) {
      await this.$store.dispatch("orders/getOrdersNew", true);
      setInterval(async () => {
        await this.$store.dispatch("orders/getOrdersNew", true);
      }, selectedReloadInterval);
    } else {
      await this.$store.dispatch("orders/getOrdersNew", false);
    }
  },

  computed: {
    newOrderQueue() {
      if (!!this.tempNewOrders.length) {
        return this.tempNewOrders;
      }
      if (!!this.searchVal && !this.tempNewOrders.length) {
        return this.tempNewOrders;
      }
      return this.getNewStateOrders;
    },
    inProgressQueue() {
      if (!!this.tempInProgressOrders.length) {
        return this.tempInProgressOrders;
      }
      if (!!this.searchVal && !this.tempInProgressOrders.length) {
        return this.tempInProgressOrders;
      }
      return this.getInProgressOrders;
    },
    finishedQueue() {
      if (!!this.tempFinishedOrders.length) {
        return this.tempFinishedOrders;
      }
      if (!!this.searchVal && !this.tempFinishedOrders.length) {
        return this.tempFinishedOrders;
      }
      return this.getFinishedOrders;
    },
    ...mapGetters({
      getAllOrders: "orders/getAllOrders",
      getNewStateOrders: "orders/getNewStateOrders",
      getInProgressOrders: "orders/getInProgressOrders",
      getFinishedOrders: "orders/getFinishedOrders"
    })
  },
  methods: {
    async getOrders() {
      this.orders = await this.$axios.$get("http://localhost:3004/orders");
      let settingData = (await this.$idb.get("settingData")) || [];
      this.leadTime = settingData.selectedTimeInterval || "5";

      this.allOrders = this.orders;
      this.tempOrders = this.orders;
      const newOrders = this.orders.filter(order => {
        return order.status === "submitted";
      });
      this.newOrders = newOrders;
      this.moveCancelOrdersToFinished();
      this.newOrders = this.calculatePickupTime(this.newOrders);

      this.newOrders = this.moveOrdersToInProgress(this.newOrders);
      this.sortNewOrders();

      this.tempNewOrders = this.newOrders;
      const inProgressOrders = this.orders.filter(order => {
        return order.status === "in progress";
      });
      this.inProgressOrders = inProgressOrders;
      this.inProgressOrders = this.calculatePickupTime(inProgressOrders);
      this.sortInProgressOrders();

      this.tempInProgressOrders = this.inProgressOrders;

      const finishedOrders = this.orders.filter(order => {
        return order.status === "finished";
      });
      this.finishedOrders = finishedOrders;
      this.tempFinishedOrders = finishedOrders;
      this.selectedOrder = this.newOrders[0];
    },
    onNewOrderClick(order) {
      this.selectedOrder = order;
    },
    onTabClick(queue){
      this.currentTab = queue;
      switch(queue){
        case 1:
          this.selectedOrder = this.getInProgressOrders[0];
          break;
        case 2:
          this.selectedOrder = this.getFinishedOrders[0];
          break;
        default:
          this.selectedOrder = this.getNewStateOrders[0];
      }
    },
    onSearchKeyUp(e) {
      this.searchVal = e.target.value;
      if (this.currentTab === 0) {
        if (this.searchVal) {
          const filteredNewOrders = this.getNewStateOrders.filter(order => {
            // return order.order_id === searchVal;
            return String(order.order_number).includes(this.searchVal);
          });
          this.tempNewOrders = filteredNewOrders;
          if (filteredNewOrders.length > 0) {
            this.selectedOrder = filteredNewOrders[0];
          } else {
            this.selectedOrder = null;
          }
        } else {
          this.tempNewOrders = [];
          this.selectedOrder = this.getNewStateOrders[0];
        }
      }
      if (this.currentTab === 1) {
        if (this.searchVal) {
          const filteredInprogressOrders = this.getInProgressOrders.filter(
            order => {
              // return order.order_id === searchVal;
              return String(order.order_number).includes(this.searchVal);
            }
          );
          this.tempInProgressOrders = filteredInprogressOrders;
          if (filteredInprogressOrders.length > 0) {
            this.selectedOrder = filteredInprogressOrders[0];
          } else {
            this.selectedOrder = null;
          }
        } else {
          this.tempInProgressOrders = [];
          this.selectedOrder = this.getInProgressOrders[0];
        }
      }
      if (this.currentTab === 2) {
        if (this.searchVal) {
          const filteredFinishedOrders = this.getFinishedOrders.filter(
            order => {
              // return order.order_id === searchVal;
              return String(order.order_number).includes(this.searchVal);
            }
          );
          this.tempFinishedOrders = filteredFinishedOrders;
          if (filteredFinishedOrders.length > 0) {
            this.selectedOrder = filteredFinishedOrders[0];
          } else {
            this.selectedOrder = null;
          }
        } else {
          this.finishedOrders = [];
          this.selectedOrder = this.getFinishedOrders[0];
        }
      }
    },
    calculatePickupTime(orders) {
      for (let i = 0; i < orders.length; i++) {
        const pos_fulfilment_time = moment(orders[i].pos_fulfilment_time);
        const today = moment();
        const pickupTimeInMinutes = pos_fulfilment_time.diff(today, "minutes");

        let pickupTime;
        // var pickupTimeWithSeconds;

        let h = Math.floor(pickupTimeInMinutes / 60);
        let m = Math.floor(pickupTimeInMinutes % 60);
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

        if (pickupTimeInMinutes < 0) {
          orders[i].overdue = true;
        } else {
          orders[i].overdue = false;
        }

        // h != 0
        //   ? (pickupTimeWithSeconds = h + " hr " + m + " Min " + s + " Seconds")
        //   : (pickupTimeWithSeconds = m + " Min" + s + " Seconds");

        orders[i].pickupTime = pickupTime;
        orders[i].pickupTimeInMinutes = pickupTimeInMinutes;
        // orders[i].pickupTimeWithSeconds = pickupTimeWithSeconds;
      }
      return orders;
    },
    findOrderArray(orderStatus) {
      switch (orderStatus) {
        case "in progress":
          return ["inProgressQueue", "tempInProgressOrders"];
        case "finished":
          return ["finishedQueue", "tempFinishedOrders"];
        default:
          return ["newOrderQueue", "tempNewOrders"];
      }
    },
    orderStatusChange(order, nextState) {
      // const [fromOrderArrayName, tmpFromArray] = this.findOrderArray(
      //   order.status
      // );
      // const [toOrderArrayName, tmpToArray] = this.findOrderArray(nextState);
      // // from
      // this[fromOrderArrayName] = this[fromOrderArrayName].filter(
      //   (ord) => order.order_id !== ord.order_id
      // );
      // this[tmpFromArray] = this[tmpFromArray].filter(
      //   (ord) => order.order_id !== ord.order_id
      // );
      // // to
      // this[toOrderArrayName] = [
      //   { ...order, status: nextState },
      //   ...this[toOrderArrayName],
      // ];
      // this[tmpToArray] = [{ ...order, status: nextState }, ...this[tmpToArray]];
      // // show first order
      // this.selectedOrder = this[fromOrderArrayName][0];
      console.log(`On Order Status Change::`, {order, nextState});
      //call moving
      const [fromQueueName] = this.findOrderArray(order.status);
      let finishedOrder = order;
      if (nextState == "finished") {
        // finishedOrder = { timeStampForOrders: moment().format(), ...order };
      }
      this.$store.dispatch("orders/moveOrdersManually", {
        order: finishedOrder,
        nextState
      });
      this.selectedOrder = this[fromQueueName][0];
    },
    moveOrdersToInProgress(orders) {
      let leadTimeInMinutes = parseInt(this.leadTime.split(" ")[0]);
      var isMoved = false;
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].pickupTimeInMinutes <= leadTimeInMinutes) {
          for (let j = 0; j < this.orders.length; j++) {
            if (this.orders[j].order_id == orders[i].order_id) {
              this.orders[j].status = "in progress";
              orders[i].status = "in progress";
              isMoved = true;
              break;
            }
          }
        }
      }
      if (isMoved) {
        return orders.filter(order => {
          return order.status === "new";
        });
      } else {
        return orders;
      }
    },
    moveCancelOrdersToFinished() {
      for (let i = 0; i < this.newOrders.length; i++) {
        if (this.newOrders[i].cancelled) {
          this.newOrders[i].status = "finished";
        }
      }
    },
    sortNewOrders() {
      this.newOrders.sort(function(a, b) {
        return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
      });
    },
    sortInProgressOrders() {
      this.inProgressOrders.sort(function(a, b) {
        return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
      });
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

</style>
