<template>
  <v-btn
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
              <img src="~/assets/ubereats.png" width="70%" />
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md6>
        <v-container v-if="isOrderFinished" fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="left" justify="center" style="color: #509ad8">
              <!-- TODO: NEED TO CALCULATE -->
              {{ item.pickupTime }}
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
              {{ item.order_lines.length }}
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
  data() {
    return {
      pickupTime: ""
    };
  },
  mounted() {},
  computed: {
    isOrderFinished() {
      return this.$props.item.status !== "finished";
    }
  },
  methods: {
    onOrderClick() {
      this.$emit("orcerClick", this.item);
    }
  }
};
</script>
