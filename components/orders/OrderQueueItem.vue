<template>
  <div class="swipeable-stack">
    <div v-if="showSwipe.right" class="swipe-bg swipe-left-area">
      Moving to in progress
    </div>
    <v-btn
      v-touch="{
        left: () => swipe('left'),
        right: () => swipe('right'),
      }"
      :class="
      `${item.cancelled && `cancelled-item`} ${isOverdue && `overdue-item`}`
      "
      style="
        width: 100%;
        background-color: #282e35;
        color: #babdbf;
        text-transform: none;
        height: 75px;
      "
      @click="onOrderClick()"
    >
      <v-layout>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <img :src="getImage" width="70%" />
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md6>
        <v-container v-if="isCancelled" fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="left" justify="center" class="cancelled">
              Cancelled
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else-if="isOrderFinished" fill-height fluid>
          <v-row align="center" justify="center">
            <v-col
              align="left"
              justify="center"
              v-model="pickTimeCountDown"
              :class="`pickup-time ${isOverdue && `overdue`}`"
            >
              {{ pickupTime }}
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              #{{ item.order_id }}
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              {{ item.order_lines.length }} items
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
    </v-btn>
    <div v-if="showSwipe.left">Moving to Finished</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickTimeCountDown: this.$props.item.pickupTimeInMinutes,
      pickupTime: this.$props.item.pickupTime
    };
  },
  props: ["item"],
  data() {
    return {
      showSwipe: {
        left: false,
        right: false,
      },
    };
  },
  computed: {
    isOrderFinished() {
      return this.$props.item.status !== "finished";
    },
    isCancelled() {
      return this.$props.item.cancelled;
    },
    getImage() {
      const { item } = this.$props;
      let fulfilment_source = item.fulfilment_source;
      let imgSrc;
      switch (fulfilment_source) {
        case "Uber Eats":
          return require("~/assets/ubereats.png");
        case "Delivery Hero":
          return require("~/assets/deliveryHero.png");
        case "Just Eat":
          return require("~/assets/justEat.png");
        default:
          imgSrc = "";
      }
      return imgSrc;
    },
    isOverdue() {
      const { item } = this.$props;
      if (item.status === `finished`) {
        return false;
      }
      return item.overdue;
    },
  },
  watch: {
    pickTimeCountDown: {
      handler(value) {
        setTimeout(() => {
          this.pickTimeCountDown--;
          let pickupTime;

          let h = Math.floor(value / 60);
          let m = Math.floor(value % 60);

          if (h != 0) {
            if (h < 0) {
              h++;
              if (h == 0) {
                pickupTime = m + " Min";
              } else {
                pickupTime = h + " hr " + m + " Min";
              }
            } else {
              pickupTime = h + " hr " + m + " Min";
            }
          } else {
            pickupTime = m + " Min";
          }
          this.pickupTime = pickupTime;
        }, 60000);
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  methods: {
    onOrderClick() {
      this.$emit("orderClick", this.item);
    },
    displayFromCountDownTimer(s) {
      s = s - 1;
    },
    swipe(direction) {
      this.showSwipe[direction] = true;
      setTimeout(() => {
        this.showSwipe[direction] = false;
      }, 900);
    },
  },
};
</script>

<style scoped>
.cancelled {
  color: #f09d00;
  text-decoration: line-through 1px;
}
.pickup-time {
  color: #509ad8;
}
.overdue {
  color: #e00000;
}
.overdue-item {
  border: 2px solid #ff0000;
}
.cancelled-item {
  border: 2px solid #f09d00;
}

.swipe-bg {
  background: #f6f8fa 0% 0% no-repeat padding-box;
  padding: 5px 30px;
  border-radius: 16px 0 0 16px;
  text-transform: uppercase;
}
.swipe-left-area {
}
.swipeable-stack {
  flex-direction: row;
  display: flex;
  border-radius: 16px;
  line-height: 1;
}
</style>
