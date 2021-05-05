<template>
  <v-dialog v-model="show" width="500">
    <v-card light>
      <v-card-title>
        <font-awesome-icon :icon="['fa', 'question-circle']" />
        &nbsp;Confirm Action
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        Please confirm that you wish to move this item back to the In Progress
        queue.
      </v-card-text>

      <v-card-actions class="justify-center">
        <common-button @click="closeDialog" outlined>Close</common-button>
        <common-button @click="clickConfirm" dark>Confirm</common-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show"],
  emits: ["closeDialog", "clickConfirm"],
  methods: {
    closeDialog() {
      return this.$emit("closeDialog");
    },
    clickConfirm() {
      return this.$emit("clickConfirm");
    },
  },
};
</script>