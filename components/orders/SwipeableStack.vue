<template>
  <div
    class="swipeable-stack"
    v-touch="{
      left: () => swipe('left'),
      right: () => swipe('right'),
    }"
  >
    <div
      v-if="showSwipe.right"
      :class="`swipe-bg swipe-left-area swipe-${item.status.replace(' ', '-')}`"
    >
      <div>
        <p class="ma-0">Moving to</p>
        <p class="ma-0">{{ nextOrderState }}</p>
      </div>
      <v-icon :color="leftArrowColor"
        >mdi-arrow-right-bold-circle-outline</v-icon
      >
    </div>
    <slot />
    <div v-if="showSwipe.left" class="swipe-bg swipe-right-area">
      <p class="ma-0">Moving to</p>
      <p class="ma-0">Finished</p>
      <v-icon color="blue">mdi-arrow-left-bold-circle-outline</v-icon>
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
      return "blue";
    },
  },
  methods: {
    swipe(direction) {
      this.showSwipe[direction] = true;
      setTimeout(() => {
        this.showSwipe[direction] = false;
        this.$emit(
          "orderStatusChange",
          this.item,
          this.nextOrderState.toLowerCase()
        );
      }, 4000);
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
.swipe-left-area,
.swipe-right-area {
  color: black;
}
.swipe-right-area {
  text-align: left;
}
.swipe-left-area p {
  width: 130%;
}
.swipe-left-area {
  text-align: right;
}
.swipe-left-area div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5px;
}
.swipe-new {
  color: #509ad9;
}
</style>