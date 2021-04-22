<template>
  <div>
    <v-sheet class="order-item-list" elevation="5">
      <v-container class="order-item-container">
        <v-row class="item-details pb-2 mb-2">
          <v-col class="pa-0">
            <v-icon color="#2D3941"> mdi-format-list-bulleted-square </v-icon>
            <span class="black--text text--darken-1">Items</span>
          </v-col>
          <v-col class="pa-0 text-right black--text text--darken-1">
            <span>{{ amount }}</span>
          </v-col>
        </v-row>
        <v-row>
          <OrderItem v-for="(item, idx) of items" :item="item" :key="idx" />
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped>
.order-item-list {
  border-radius: 16px;
  background: #ffffff 0% 0% no-repeat padding-box;
}
.order-item-container {
  padding: 22px 30px;
}
.item-details {
  border-bottom: 1px solid #ccced0;
  font-weight: bold;
}
</style>

<script>
import OrderItem from "./OrderItem";
export default {
  components: { OrderItem },
  props: ["items", "amount"],
};
</script>