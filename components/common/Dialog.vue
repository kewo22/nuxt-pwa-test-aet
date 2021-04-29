<template>
  <v-dialog v-model="show" width="500">
    <v-card light>
      <v-card-title>
        <v-icon filled>mdi-progress-question</v-icon>
        &nbsp;Confirm Action
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        Please confirm that you wish to move this item back to the In Progress
        queue.
      </v-card-text>

      <v-card-actions class="justify-center">
        <Button @click="closeDialog" outlined>Close</Button>
        <Button @click="clickConfirm" dark>Confirm</Button>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-btn color="primary" rounded @click="closeDialog"> Close </v-btn> -->
        <!-- <v-btn color="primary" text @click="closeDialog"> Confirm </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from "./Button";
export default {
  components: { Button },
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
  mounted() {
    console.log(this);
  },
};
</script>