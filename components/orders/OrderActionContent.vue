<template>
  <v-sheet class="order-action-content pa-7 text-center">
    <p class="mb-3">{{ actionMessage }}</p>
    <Button @click="orderStatusChange" light outlined :color="btnColor">
      {{ nextState }}
    </Button>
  </v-sheet>
</template>

<script>
import Button from "../common/Button";
export default {
  components: { Button },
  props: ["state"],
  emits: ["orderStatusChange"],
  methods: {
    orderStatusChange() {
      this.$emit("orderStatusChange", this.nextState.toLowerCase());
    },
  },
  computed: {
    btnColor() {
      switch (this.$props.state) {
        case "in progress":
          return "green";
        case "new":
        case "finished":
        default:
          return "blue";
      }
    },
    actionMessage() {
      switch (this.$props.state) {
        case "finished":
          return "Move back to";
        case "new":
        case "in progress":
        default:
          return "Move forward to";
      }
    },
    nextState() {
      switch (this.$props.state) {
        case "new":
        case "submitted":
          return "In progress";
        case "in progress":
          return "Finished";
        case "finished":
          return "In Progress";
        default:
          return "Move back to";
      }
    },
  },
};
</script>

<style scoped>
.order-action-content {
  background: #ffffff 0% 0% no-repeat padding-box;
}

.order-action-content > p {
  color: black;
  line-height: 0;
  font-size: 15px;
}
</style>