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
          <v-tab @click="onNewTabClick(0)"
            >New ({{ getNewStateOrders.length }})</v-tab
          >
          <v-tab @click="onInProgressTabClick(1)">
            In Progress ({{ getInProgressOrders.length }})
          </v-tab>
          <v-tab @click="onFinishedTabClick(2)">
            Finished ({{ getFinishedOrders.length }})
          </v-tab>
        </v-tabs>

        <v-tabs-items class="tab-items" v-model="tabs">
          <v-tab-item class="tab-item">
            <v-card class="v-card" flat>
              <v-card-text class="v-card-text">
                <div v-if="getNewStateOrders.length">
                  <OrderQueueItem
                    v-for="newOrder in getNewStateOrders"
                    :class="
                      `mb-2 ${newOrder.cancelled && `cancelled-order`} 
                    ${selectedOrder &&
                      selectedOrder.order_id === newOrder.order_id &&
                      `selected new`}`
                    "
                    :key="`${newOrder.order_id}`"
                    :item="newOrder"
                    @orderClick="onNewOrderClick(newOrder)"
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
                <div v-if="getInProgressOrders.length">
                  <OrderQueueItem
                    v-for="newOrder in getInProgressOrders"
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
                <div v-if="getFinishedOrders.length">
                  <OrderQueueItem
                    v-for="newOrder in getFinishedOrders"
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
      <OrderDetails
        v-if="selectedOrder"
        :order="selectedOrder"
        @orderStatusChange="orderStatusChange"
      />
      <NoOrder v-else />
    </div>
    <!-- <div style="display:none">
      {{ newOrdersD }}
    </div> -->
    <!-- <div style="display:none">
      {{ getSelectedOrders1 }}
    </div> -->
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
  mounted() {
    this.$store.dispatch("orders/getOrdersNew");
    this.setInitialData();
    // this.getOrders();
  },
  computed: {
    // newOrdersD() {
    //   this.newOrders = this.getNewStateOrders;
    //   return this.getNewStateOrders;
    // },
    // getSelectedOrders1() {
    //   this.selectedOrder = this.getSelectedOrders;
    //   console.log(" this.selectedOrder ", this.selectedOrder )
    //   return this.getSelectedOrders;
    // },
    ...mapGetters({
      getAllOrders: "orders/getAllOrders",
      getNewStateOrders: "orders/getNewStateOrders",
      getInProgressOrders: "orders/getInProgressOrders",
      getFinishedOrders: "orders/getFinishedOrders",
      getSelectedOrders: "orders/getSelectedOrders"
    })
  },
  methods: {
    setInitialData() {
      this.$store.commit("orders/setSelectedOrders");

      this.selectedOrder = this.getSelectedOrders;
      console.log("this.selectedOrder", this.getSelectedOrders);
    },
    async getOrders() {
      this.orders = await this.$axios.$get("http://localhost:3004/orders");
      let settingData = (await this.$idb.get("settingData")) || [];
      this.leadTime = settingData.selectedTimeInterval || "15";

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
          return ["inProgressOrders", "tempInProgressOrders"];
        case "finished":
          return ["finishedOrders", "tempFinishedOrders"];
        default:
          return ["newOrders", "tempNewOrders"];
      }
    },
    orderStatusChange(order, nextState) {
      const [fromOrderArrayName, tmpFromArray] = this.findOrderArray(
        order.status
      );
      const [toOrderArrayName, tmpToArray] = this.findOrderArray(nextState);
      // from
      this[fromOrderArrayName] = this[fromOrderArrayName].filter(
        ord => order.order_id !== ord.order_id
      );
      this[tmpFromArray] = this[tmpFromArray].filter(
        ord => order.order_id !== ord.order_id
      );
      // to
      this[toOrderArrayName] = [
        { ...order, status: nextState },
        ...this[toOrderArrayName]
      ];
      this[tmpToArray] = [{ ...order, status: nextState }, ...this[tmpToArray]];
      // show first order
      this.selectedOrder = this[fromOrderArrayName][0];
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