<template>
  <v-container class="order-detail-root">
    <v-row class="pb-5">
      <v-col md="7">
        <v-img max-width="200" max-height="65" :src="order.src" />
      </v-col>
      <v-col md="4">
        <v-btn elevation="2" rounded dark>Print Order</v-btn>
      </v-col>
      <v-col md="1">
        <v-btn rounded fab elevation="2" small dark>
          <v-icon color="blue">mdi-dots-vertical</v-icon>
        </v-btn>
      </v-col>
      <p class="order-status in-progress">{{ order.status }}</p>
    </v-row>
    <v-row class="pb-15">
      <OrderStatLabel label="Order Number:" :value="order.orderId" />
      <OrderStatLabel label="Type:" :value="order.type" />
      <OrderStatLabel label="Items:" :value="order.count" />
      <OrderStatLabel label="Predicted prep time:" :value="order.time" />
    </v-row>
    <v-row>
      <v-col>
        <OrderItemList
          :items="order.ordered_items"
          :amount="order_amount"
        />
      </v-col>
    </v-row>
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
      return this.$currency(this.$props.order.total_amount);
    }
  }
};
</script>

<style>
.order-detail-root {
  height: 100%;
  padding: 50px 80px;
}
.order-status {
  font-size: 30px;
  line-height: 36px;
  font-weight: bold;
}
.in-progress {
  color: #509ad9;
}
</style>
