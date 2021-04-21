<template>
  <div>
    <v-sheet class="order-item-list" elevation="5">
      <v-container>
        <v-row>
          <v-col>
            <v-icon color="#2D3941"> mdi-format-list-bulleted-square </v-icon>
            Items
          </v-col>
          <v-col class="text-right">$16.70</v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped>
.order-item-list {
  box-shadow: 0px 8px 32px #c5c7c9;
  border-radius: 16px;
  background: #ffffff 0% 0% no-repeat padding-box;
}
/* .text-left {
  text-align: right;
} */
</style>

<script>
export default {
  props: ["items"]
};
</script>