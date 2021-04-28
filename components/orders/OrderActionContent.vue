<template>
  <v-sheet class="order-action-content pa-7 text-center">
    <p class="mb-3">Move forward to</p>
    <Button
      @click="orderStatusChange"
      class="px-1"
      light
      outlined
      :color="btnColor"
    >
      Finished
    </Button>
    <!-- <v-btn
        @click="orderStatusChange"
        rounded
        light
        outlined
        :color="btnColor"
      >
        Finished
      </v-btn> -->
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
      this.$emit("orderStatusChange", this.$props.state);
    },
  },
  computed: {
    btnColor() {
      switch (this.$props.state) {
        case "finished":
        default:
          return "green";
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