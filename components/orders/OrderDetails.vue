<template>
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

    <div class="d-flex flex-column mb-3">
      <div class="d-flex flex-row justify-space-between mb-1">
        <img src="~/assets/ubereats.png" width="10%" />
        <div>
          <v-btn elevation="2" rounded dark>Print Order</v-btn>
          <v-btn rounded fab elevation="2" small dark>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="order-status in-progress">
        <p>{{ order.status }}</p>
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
      <OrderStatLabel label="Predicted prep time:" value="20 Mins" />
    </div>

    <OrderItemList :items="order.order_lines" :amount="order_amount" />
    
  </v-container>
</template>

<script>
import OrderStatLabel from "./OrderStatLabel";
import OrderItemList from "./OrderItemList";
export default {
  components: { OrderStatLabel, OrderItemList },
  props: ["order"],
  computed: {
    order_amount() {
      return this.$currency(this.$props.order.total);
    },
    order_item_count() {
      const { order } = this.$props;
      return order.order_lines ? order.order_lines.length : null;
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
  font-weight: bold;
  text-transform: capitalize;
}
.in-progress {
  color: #509ad9;
}
</style>
