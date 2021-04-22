<template>
  <v-container>
    <v-row>
      <v-col md="1" class="pa-0 black--text text--darken-1">
        {{ item.item_qty }}x
      </v-col>
      <v-col md="8" class="pa-0 black--text text--darken-1">
        {{ item.item_name }}
      </v-col>
      <v-col md="3" class="pa-0 text-right black--text text--darken-1">
        {{ `${item.currency}${item.amount}` }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["item"],
  mounted() {
    console.log(this.$props);
  },
};
</script>