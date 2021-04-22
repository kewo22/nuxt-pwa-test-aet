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
      <p class="order-status in-progress">
        {{ order.order_status || order.status }}
      </p>
    </v-row>
    <v-row class="pb-5">
      <OrderStatLabel
        label="Order Number:"
        :value="order.order_id || order.orderId"
      />
      <OrderStatLabel label="Type:" :value="order.order_type || order.type" />
      <OrderStatLabel label="Items:" :value="order_item_count || order.count" />
      <OrderStatLabel
        label="Predicted prep time:"
        :value="order.predicted_prep_time || order.time"
      />
    </v-row>
    <v-row>
      <v-col>
        <OrderItemList :items="order.ordered_items" :amount="order_amount" />
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
    },
    order_item_count() {
      const { order } = this.$props;
      return order.ordered_items ? order.ordered_items.length : null;
    },
  },
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
  text-transform: capitalize;
}
.in-progress {
  color: #509ad9;
}
</style>
