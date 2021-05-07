<template>
  <SwipeableStack :item="item" v-on="$listeners" :nextOrderState="nextOrderState">
    <v-btn
      :class="`${item.cancelled && `cancelled-item`} ${
        isOverdue && `overdue-item`
      }`"
      style="
        width: 100%;
        background-color: #282e35;
        color: #babdbf;
        text-transform: none;
        height: inherit;
        border-radius: 16px;
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
                #{{ item.order_number }}
              </v-col>
            </v-row>
          </v-container>
        </v-flex>
        <v-flex xs4 sm4 md2>
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-col align="center" justify="center">
                {{ item.order_lines.length }} 
                {{ item.order_lines.length > 1 ? `items` : `item` }}
              </v-col>
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
    </v-btn>
  </SwipeableStack>
</template>

<script>
import SwipeableStack from "./SwipeableStack";
export default {
  components: { SwipeableStack },
  props: ["item"],
  data() {
    return {
      pickTimeCountDown: this.$props.item.pickupTimeInMinutes,
      pickupTime: this.$props.item.pickupTime,
      order_number: this.$props.item.order_number
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
      return this.$getMarketplaceImages(item.fulfilment_source, "thumbnail");
    },
    isOverdue() {
      const { item } = this.$props;
      if (item.status === `finished`) {
        return false;
      }
      return item.overdue;
    },
    nextOrderState() {
      switch (this.item.status) {
        case "new":
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
         
          this.$store.commit("orders/moveOrdersToInProgressAuto", {
            pickupTime,
            pickupTimeInMinutes: this.pickTimeCountDown,
            order_number: this.order_number
          });
        }, 60000);
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    onOrderClick() {
      this.$emit("orderClick", this.item);
    },
    displayFromCountDownTimer(s) {
      s = s - 1;
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
  border: 2px solid #f09d00 !important;
}
</style>
