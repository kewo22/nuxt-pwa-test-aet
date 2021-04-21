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
        <v-btn rounded fab small="66" dark>
          <v-icon color="blue">mdi-dots-vertical</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>Order Status</v-col>
    </v-row>
    <v-row>
      <v-col>Order Stats</v-col>
    </v-row>
    <v-row>
      <v-col>Order Items</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
</style>
