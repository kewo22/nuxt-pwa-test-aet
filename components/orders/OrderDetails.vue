<template>
  <v-container class="order-detail-root">
    <v-row>
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
    <v-row class="pad-bottom">
      <order-stat-label label="Order Number:" :value="order.orderId" />
      <order-stat-label label="Type:" :value="order.type" />
      <order-stat-label label="Items:" :value="order.count" />
      <order-stat-label label="Predicted prep time:" :value="order.time" />
    </v-row>
    <v-row>
      <v-col>Order Items</v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderStatLabel from "./OrderStatLabel";
export default {
  components: { OrderStatLabel },
  props: ["order"],
  mounted() {
    console.log("mounted", this.$props.order);
  },
};
</script>

<style>
.order-detail-root {
  height: 100%;
  padding: 50px 80px;
}
.pad-bottom {
  padding-bottom: 20px;
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
