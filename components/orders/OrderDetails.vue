<template>
  <div>
    <v-container class="order-detail-root pa-10">
      <!-- <v-row class="pb-5">
      <v-col md="7"> -->
      <!-- <v-img max-width="200" max-height="65" :src="order.src" /> -->
      <!-- <img src="~/assets/ubereats.png" width="20%" />
      </v-col>
      <v-col md="4">
        <v-btn elevation="2" rounded dark>Print Order</v-btn>
      </v-col>
      <v-col md="1">
        <v-btn rounded fab elevation="2" small dark>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-col>
      <p class="order-status in-progress">
        {{ order.status }}
      </p>
    </v-row> -->

      <div class="d-flex flex-column mb-1">
        <div class="d-flex flex-row justify-space-between mb-1">
          <img src="~/assets/ubereats.png" width="10%" />
          <div>
            <Button @click="printOrder(order)" elevation="2" dark>
              Print Order
            </Button>
            <v-menu offset-y rounded="lg" nudge-top="-10">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  rounded
                  fab
                  elevation="2"
                  small
                  dark
                  :disabled="isActionsCancelled"
                  :style="
                    isActionsCancelled
                      ? { backgroundColor: 'grey !important' }
                      : {}
                  "
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <OrderActionContent
                :state="order.status"
                @orderStatusChange="changeOrderStatus"
              />
            </v-menu>
          </div>
        </div>
        <div
          :class="`order-status ${order.status} ${isOverDue && `overdue`} ${
            isCancelled && `cancelled`
          }`"
        >
          <p>{{ orderStatus }}</p>
        </div>
      </div>

      <!-- <v-row class="pb-5">
      <OrderStatLabel label="Order Number:" :value="order.order_id" />
      <OrderStatLabel label="Type:" :value="order.fulfilment_type" />
      <OrderStatLabel label="Items:" :value="order_item_count" />
      <OrderStatLabel label="Predicted prep time:" value="20 Mins" />
    </v-row> -->

      <div class="d-flex flex-row justify-space-between mb-3">
        <OrderStatLabel label="Order Number:" :value="order.order_id" />
        <OrderStatLabel label="Type:" :value="order.fulfilment_type" />
        <OrderStatLabel label="Items:" :value="order_item_count" />
        <!-- TODO: NEED TO CALCULATE -->
        <OrderStatLabel
          v-if="isInProgressStatus"
          label="Predicted prep time:"
          value="20 Mins"
        />
      </div>

      <OrderItemList :items="order.order_lines" :amount="order_amount" />
    </v-container>
    <Dialog
      :show="showDialog"
      @closeDialog="closeDialog"
      @clickConfirm="confirmOrderStateChange"
    />
  </div>
</template>

<script>
import OrderStatLabel from "./OrderStatLabel";
import OrderItemList from "./OrderItemList";
import OrderActionContent from "./OrderActionContent";
import Button from "../common/Button";
import Dialog from "../common/Dialog";

export default {
  components: {
    Button,
    Dialog,
    OrderActionContent,
    OrderStatLabel,
    OrderItemList,
  },
  props: ["order"],
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    orderStatus() {
      if (this.isCancelled) {
        return `Cancelled!`;
      } else if (this.isOverDue) {
        return `Overdue`;
      }
      return this.$props.order.status;
    },
    isOverDue() {
      // TODO: Compute order overdue
      const { order } = this.$props;
      return order.overdue;
    },
    isCancelled() {
      // return this.$props.order.status === "cancelled";
      // TODO: Need to figure out how to manage cancelled order
      //       in the dataset while it is on the in-progress queue
      const { order } = this.$props;
      return order.cancelled;
    },
    isActionsCancelled() {
      const { order } = this.$props;
      return order.status === "finished" && order.cancelled;
    },
    order_amount() {
      return this.$currency(this.$props.order.total);
    },
    order_item_count() {
      const { order } = this.$props;
      return order.order_lines ? order.order_lines.length : null;
    },
    isInProgressStatus() {
      return this.$props.order.status === "in progress";
    },
  },
  methods: {
    printOrder(order) {
      alert("Print order : " + order.order_id);
    },
    changeOrderStatus(nextState) {
      const currentState = this.$props.order.status;
      if (currentState === "finished" && nextState === "in progress") {
        // show prompt to confirm
        this.showDialog = true;
      } else {
        this.$emit("orderStatusChange", this.$props.order, nextState);
      }
    },
    closeDialog() {
      this.showDialog = false;
    },
    confirmOrderStateChange() {
      this.closeDialog();
      this.$emit("orderStatusChange", this.$props.order, "in progress");
    },
  },
};
</script>

<style>
.order-detail-root {
  height: 100%;
  /* padding: 50px 80px; */
}
.order-status {
  font-size: 25px;
  font-weight: bold;
  text-transform: capitalize;
  color: #509ad9;
}
.new {
  color: #aa33bf;
}
.finished {
  color: #4aa36f;
}
.overdue {
  color: #e00000;
}
.cancelled {
  color: #f09d00;
  text-decoration: line-through 2px;
}
</style>
