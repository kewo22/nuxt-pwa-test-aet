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
        {{ itemAmount }}
      </v-col>
    </v-row>
    <v-row class="py-1">
      <v-col offset-md="1">
        <v-row v-for="(modifier, idx) of item.item_modifiers" :key="idx">
          <span class="grey--text">
            {{ modifier }}
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    itemAmount() {
      return this.$currency(this.$props.item.amount);
    },
  },
};
</script>