<template>
  <v-container>
    <v-row class="item-header">
      <v-col md="1" class="pa-0 black--text"> {{ item.quantity }}x </v-col>
      <v-col md="8" class="pa-0 black--text">
        {{ item.product.name }}
      </v-col>
      <v-col md="3" class="pa-0 text-right black--text">
        {{ itemAmount }}
      </v-col>
    </v-row>
    <v-row v-if="item.note" class="py-1">
      <v-col offset-md="1">
        <v-row v-for="(modifier, idx) of item.note.split(',')" :key="idx">
          <span class="grey--text">
            {{ modifier }}
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.item-header :not(.text-right) {
  font-weight: bold;
}
</style>

<script>
export default {
  props: ["item"],
  computed: {
    itemAmount() {
      return this.$currency(this.$props.item.total);
    },
  },
};
</script>