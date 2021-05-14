<template>
  <div
    :class="`swipeable-stack swipe-${item.status.replace(' ', '-')} ${
      showSwipe.left ? `swipe-right` : ``
    }`"
    v-touch="{
      left: () => swipe('left'),
      right: () => swipe('right'),
    }"
  >
    <div
      v-if="canSwipeToRight && showSwipe.right"
      :class="`swipe-bg swipe-left-area`"
    >
      <div>
        <p class="ma-0">Moving to</p>
        <p class="ma-0">{{ nextOrderState }}</p>
      </div>
      <v-icon :color="leftArrowColor">
        mdi-arrow-right-bold-circle-outline
      </v-icon>
    </div>
    <slot />
    <div
      v-if="canSwipeToLeft && showSwipe.left"
      class="swipe-bg swipe-right-area"
    >
      <v-icon color="blue">mdi-arrow-left-bold-circle-outline</v-icon>
      <div>
        <p class="ma-0">Moving to</p>
        <p class="ma-0">In Progress</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "nextOrderState"],
  data() {
    return {
      showSwipe: {
        left: false,
        right: false,
      },
    };
  },
  computed: {
    leftArrowColor() {
      switch (this.item.status) {
        case "submitted":
        case "new":
          return "#509AD9";
        case "in progress":
          return "#4AA36F";
        default:
          return "";
      }
    },
    canSwipeToRight() {
      // blocking right Swipe for all cancelled orders
      if (this.item.cancelled) {
        // checking order can be moved to finshed queue
        // (for cancelled orders residing in in-progress queue)
        return this.nextOrderState === "Finished";
      }
      return this.item.status !== "finished";
    },
    canSwipeToLeft() {
      // return true;
      // blocking left Swipe for all cancelled orders
      if (this.item.cancelled) {
        return false;
      }
      // Only allow finished orders to be swiped to right
      return this.nextOrderState === "In Progress";
    },
  },
  methods: {
    /**
     * Show the moving UI updated
     * and will disappear along with the change event
     */
    swipe(direction) {
      if (!this.checkAbilityToSwipe(direction)) return;
      this.showSwipe[direction] = true;
      setTimeout(() => {
        this.showSwipe[direction] = false;
        if (this.item.status === "finished") {
          this.$emit("confirmOrderChange", this.item);
        } else {
          this.emitOrderChange();
        }
      }, 1000);
    },
    /**
     * Emit order change event
     */
    emitOrderChange() {
      this.$emit(
        "orderStatusChange",
        this.item,
        this.nextOrderState.toLowerCase()
      );
    },
    /**
     * Check item can be swiped to given direction
     */
    checkAbilityToSwipe(direction) {
      switch (direction) {
        case "right":
          return this.canSwipeToRight;
        case "left":
          return this.canSwipeToLeft;
        default:
          return false;
      }
    },
  },
};
</script>

<style scoped>
/* SWIPE */
.swipeable-stack {
  background: #f6f8fa 0% 0% no-repeat padding-box;
  display: flex;
  border-radius: 16px;
  line-height: 1;
  /* overflow: hidden; */
  height: 90px;
}
.swipe-bg {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 16px 0 0 16px;
  text-transform: uppercase;
  margin-left: 10px;
}
.swipe-right {
  justify-content: flex-end;
}
.swipe-left-area,
.swipe-right-area {
  color: black;
}
.swipe-right-area {
  text-align: left;
  margin-left: 0;
}
.swipe-right-area p,
.swipe-left-area p {
  width: 130%;
}
.swipe-left-area {
  text-align: right;
  padding-right: 10px;
}
.swipe-right-area div {
  padding-left: 5px;
  width: 6rem;
}
.swipe-left-area div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5px;
}
.swipe-submitted .swipe-left-area,
.swipe-right-area {
  color: #509ad9;
}
.swipe-in-progress .swipe-left-area {
  color: #4aa36f;
}
</style>