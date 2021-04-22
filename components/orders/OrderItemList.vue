<template>
  <div>
    <v-sheet class="order-item-list" elevation="5">
      <v-container class="order-item-container">
        <v-row class="item-details pb-2">
          <v-col class="pa-0">
            <v-icon color="#2D3941"> mdi-format-list-bulleted-square </v-icon>
            <span class="black--text text--darken-1">Items</span>
          </v-col>
          <v-col class="pa-0 text-right black--text text--darken-1">
            {{ amount }}
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped>
.order-item-list {
  /* box-shadow: 0px 8px 32px #c5c7c9; */
  border-radius: 16px;
  background: #ffffff 0% 0% no-repeat padding-box;
}
.order-item-container {
  padding: 22px 30px;
}
.item-details {
  border-bottom: 1px solid #ccced0;
}
</style>

<script>
export default {
  props: ["items", "amount"],
};
</script>