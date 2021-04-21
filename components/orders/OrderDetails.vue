<template>
  <v-container class="order-detail-root">
    <v-row>
      <v-col md="6">
        <v-img contain max-height="100" :src="order.src" />
      </v-col>
      <v-col md="4">Print Order button</v-col>
      <v-col md="2">Actions</v-col>
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
