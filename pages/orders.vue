<template>
  <div class="d-flex fill-height orders-wrapper">
    <div class="d-flex flex-column section-1 pa-2">
      <div>
        <v-text-field
          label="Search by ID"
          placeholder="Search by ID"
          solo
          dense
          height="30"
          class="search-input ml-auto"
          @keyup="onSearchKeyUp"
        />
      </div>
      <div class="d-flex flex-column order-list-wrapper">
        <v-item-group
          v-model="tabs"
          class="shrink queue-buttons pa-4"
          mandatory
          tag="v-flex"
        >
          <v-item v-slot="{ active, toggle }">
            <v-btn depressed :input-value="active" @click="toggle">
              New ({{ newOrderQueue.length }})
            </v-btn>
          </v-item>
          <v-item v-slot="{ active, toggle }">
            <v-btn depressed :input-value="active" @click="toggle">
              In Progress ({{ inProgressQueue.length }})
            </v-btn>
          </v-item>
          <v-item v-slot="{ active, toggle }">
            <v-btn depressed :input-value="active" @click="toggle">
              Finished ({{ finishedQueue.length }})
            </v-btn>
          </v-item>
        </v-item-group>

        <v-window v-model="tabs" touchless class="queue-list">
          <v-window-item class="tab-item">
            <!-- <v-card class="v-card" flat>
              <v-card-text class="v-card-text"> -->
                <orders-order-queue
                  :ordersQueue="newOrderQueue"
                  :selectedOrderID="
                    !!selectedOrder ? selectedOrder.order_id : undefined
                  "
                  :searchVal="searchVal"
                  @orderClick="onNewOrderClick"
                  @orderStatusChange="orderStatusChange"
                />
              <!-- </v-card-text>
            </v-card> -->
          </v-window-item>
          <v-window-item class="tab-item">
            <!-- <v-card class="v-card" flat>
              <v-card-text class="v-card-text"> -->
                <orders-order-queue
                  :ordersQueue="inProgressQueue"
                  :selectedOrderID="
                    !!selectedOrder ? selectedOrder.order_id : undefined
                  "
                  :searchVal="searchVal"
                  @orderClick="onNewOrderClick"
                  @orderStatusChange="orderStatusChange"
                />
              <!-- </v-card-text>
            </v-card> -->
          </v-window-item>
          <v-window-item class="tab-item">
            <!-- <v-card class="v-card" flat>
              <v-card-text class="v-card-text"> -->
                <orders-order-queue
                  :ordersQueue="finishedQueue"
                  :selectedOrderID="
                    !!selectedOrder ? selectedOrder.order_id : undefined
                  "
                  :searchVal="searchVal"
                  @orderClick="onNewOrderClick"
                  @orderStatusChange="orderStatusChange"
                  @confirmOrderChange="showOrderStateChangeConfirmPrompt"
                />
              <!-- </v-card-text>
            </v-card> -->
          </v-window-item>
        </v-window>
      </div>
    </div>

    <div class="section-2 pa-2">
      <OrderDetails
        v-if="selectedOrder"
        :order="selectedOrder"
        @orderStatusChange="orderStatusChange"
      />
      <NoOrder v-else />
    </div>
    <CommonDialog
      :show="showDialog"
      @closeDialog="closeDialog"
      @clickConfirm="confirmOrderStateChange"
    />
  </div>
</template>

<script>
import OrderDetails from "~/components/orders/OrderDetails.vue";
import NoOrder from "~/components/orders/NoOrder.vue";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  components: { OrderDetails, NoOrder },
  data() {
    return {
      showDialog: false,
      tabs: null,
      selectedOrder: null,
      tempNewOrders: [],
      tempInProgressOrders: [],
      tempFinishedOrders: [],
      currentTab: 0,
      searchVal: "",
      leadTime: "",
      orders: [],
      settingData: "",
      lastSyncTime: "",
      selectedReloadInterval: "",
    };
  },
  watch: {
    tabs(newTab) {
      this.onTabClick(newTab);
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "orders/setSelectedOrders") {
        this.selectedOrder = this.$store.getters["orders/getNewStateOrders"][0];
      }
    });
  },
  async mounted() {
    let lastSyncTime =
      this.getLastSyncTime || (await this.$idb.get("lastSyncTime"));
    let isAllQueuesClear = this.getIsAllQueuesClear;

    this.settingData = (await this.$idb.get("settingData")) || [];
    this.selectedReloadInterval = this.settingData.selectedReloadInterval;

    this.selectedReloadInterval
      ? (this.selectedReloadInterval = this.selectedReloadInterval.split(
          " "
        )[1])
      : (this.selectedReloadInterval = 1);

    this.selectedReloadInterval = parseInt(this.selectedReloadInterval) * 60000;

    if (lastSyncTime && isAllQueuesClear == false) {
      await this.$store.dispatch("orders/getOrdersNew", true);
      setInterval(async () => {
        await this.$store.dispatch("orders/getOrdersNew", true);
      }, this.selectedReloadInterval);
    } else {
      if (isAllQueuesClear == false) {
        await this.$store.dispatch("orders/getOrdersNew", false);
        setInterval(async () => {
          await this.$store.dispatch("orders/getOrdersNew", true);
        }, this.selectedReloadInterval);
      }
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
      getFinishedOrders: "orders/getFinishedOrders",
      getIsAllQueuesClear: "orders/getIsAllQueuesClear",
      getLastSyncTime: "orders/getLastSyncTime",
    }),
  },
  methods: {
    showOrderStateChangeConfirmPrompt(order) {
      this.confirmOrder = order;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.confirmOrder = null;
    },
    confirmOrderStateChange() {
      this.orderStatusChange(this.confirmOrder, "in progress");
      this.closeDialog();
    },
    onNewOrderClick(order) {
      this.selectedOrder = order;
    },
    onTabClick(queue) {
      this.currentTab = queue;
      switch (queue) {
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
          const filteredNewOrders = this.getNewStateOrders.filter((order) => {
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
            (order) => {
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
            (order) => {
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
          this.selectedOrder = this.getFinishedOrders[0];
        }
      }
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
      console.log(`On Order Status Change::`, { order, nextState });
      //call moving
      const [fromQueueName] = this.findOrderArray(order.status);
      let finishedOrder = order;
      if (nextState === "finished") {
        finishedOrder = { timeStampForOrders: moment().format(), ...order };
      }
      this.$store.dispatch("orders/moveOrdersManually", {
        order: finishedOrder,
        nextState,
      });
      this.selectedOrder = this[fromQueueName][0];
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
.section-2 {
  flex: 1 0 50%;
  background: aliceblue;
  color: black;
}
.search-input {
  width: 250px;
}

.order-list-wrapper {
  flex-grow: 1;
}

.queue-list {
  height: 80vh;
  overflow: auto;
}
.queue-buttons {
  align-self: center;
  background: #282e35 0% 0% no-repeat padding-box;
  border-radius: 16px;
}

.v-card {
  height: 100%;
  overflow: hidden;
}

.v-card-text {
  height: 100%;
}
</style>
