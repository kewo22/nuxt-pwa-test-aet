<template>
  <v-btn
    :class="`${item.cancelled && `cancelled-item`} ${
      isOverdue && `overdue-item`
    }`"
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
              <!-- <v-img :aspect-ratio="16 / 9" width="100" :src="item.src"></v-img> -->
              <!-- <img src="~/assets/justEat.png" width="70%" /> -->
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
              :class="`pickup-time ${isOverdue && `overdue`}`"
            >
              <!-- TODO: NEED TO CALCULATE -->
              {{ item.pickupTime }}
              <!-- {{displayFromCountDownTimer(30)}} -->
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              {{ item.order_id }}
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
</template>

<script>
export default {
  props: ["item"],
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
      return this.$props.item.overdue;
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
  border: 2px solid #f09d00;
}
</style>
