<template>
  <v-container fluid class="pa-0">
    <v-layout>
      <v-flex>
        <v-layout>
          <v-flex xs6 sm6 md6 style="background-color: #23282c">
            <v-layout>
              <v-spacer></v-spacer>
              <v-flex xs4 sm4 md4>
                <v-btn
                  :width="width"
                  style="
                    background-color: #282e35;
                    color: #babdbf;
                    margin-top: 10%;
                    text-transform: none;
                  "
                  >Search By Id</v-btn
                >
              </v-flex>
            </v-layout>
            <v-container>
              <v-row>
                <v-col align="center">
                  <div style="width: 85%; background-color: #282e35">
                    <v-layout>
                      <v-flex xs4 sm4 md4>
                        <v-btn
                          style="
                            width: 100%;
                            background-color: #282e35;
                            color: #babdbf;
                            text-transform: none;
                          "
                        >
                          New
                        </v-btn>
                        <!-- <img id="noticeBubble" src="/green.png" /> -->
                      </v-flex>
                      <v-flex xs4 sm4 md4>
                        <v-btn
                          style="
                            width: 100%;
                            background-color: #282e35;
                            color: #babdbf;
                            text-transform: none;
                          "
                          >In Progress</v-btn
                        >
                      </v-flex>

                      <v-flex xs4 sm4 md4>
                        <v-btn
                          style="
                            width: 100%;
                            background-color: #282e35;
                            color: #babdbf;
                            text-transform: none;
                          "
                          >Finished</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col align="center">
                  <div style="width: 90%; background-color: #282e35">
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <div
                          style="
                            width: 100%;
                            background-color: #23282c;
                            max-height: 80vh;
                            overflow: auto;
                          "
                        >
                          <template>
                            <v-list-item
                              v-for="(item, index) in items"
                              :key="item.id"
                              style="height: 100px"
                            >
                              <v-list-item-action
                                @click="selectedOrder = item"
                                style="width: 100%"
                              >
                                <OrderQueueItem
                                  @click="selectNewRecord(index)"
                                  :class="{
                                    newBtnSelected: index == selectedNewIndex,
                                  }"
                                  :item="item"
                                  :selectedNewIndex="selectedNewIndex"
                                />
                              </v-list-item-action>
                            </v-list-item>
                          </template>
                        </div>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-flex>
          <v-flex xs6 sm6 md6 style="background-color: #f6f8fa">
            <OrderDetails v-if="selectedOrder" :order="selectedOrder" />
            <NoOrder v-else />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OrderDetails from "~/components/orders/OrderDetails.vue";
import OrderQueueItem from "~/components/orders/OrderQueueItem.vue";
import NoOrder from "~/components/orders/NoOrder.vue";
export default {
  components: { OrderDetails, OrderQueueItem, NoOrder },
  data: () => ({
    benched: 0,
    selectedOrder: null,
    selectedNewIndex: 0,
    items: [
      {
        id: "0",
        name: "Jennifier Harrison",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
        status: "In Progress…",
        type: "Delivery",
        total_amount: 12.98,
        currency: "$",
        ordered_items: [
          {
            id: 12,
            item_name: "Triple Decker House Burger",
            item_qty: 1,
            amount: 10.98,
            currency: "$",
            item_modifiers: ["Ketchup", "lettuce", "Mustard"],
          },
          {
            id: 12,
            item_name: "Triple Cooked Chips",
            item_qty: 1,
            amount: 2,
            currency: "$",
            item_modifiers: ["Cheese"],
          },
        ],
      },
      {
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        orderId: 114782,
        count: "1 item",
        time: "43 Mins",
        order_id: 114782,
        dp_id: 1,
        ordered_time: "2020-10-31T01:48:52Z",
        order_delivery_time: "2020-10-31T01:48:52Z",
        order_type: "Delivery",
        order_status: "NEW",
        total_amount: 10.98,
        currency: "$",
        predicted_prep_time: "43 Mins",
        ordered_items: [
          {
            item_id: 12,
            item_name: "Triple Decker House Burger",
            item_qty: 1,
            amount: 10.98,
            currency: "$",
            item_modifiers: ["Ketchup", "lettuce", "Mustard"],
          },
        ],
      },
      {
        id: 1,
        name: "Jennifier Harrison",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "1h 5 Min",
        orderId: "#114782",
        count: "2 items",
      },
      {
        id: 2,
        name: "n3",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
      },
      {
        id: 3,
        name: "n4",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
      },
      {
        id: 4,
        name: "n5",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
      },
      {
        id: 5,
        name: "n6",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
      },
      {
        id: 6,
        name: "n7",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
      },
      {
        id: 7,
        name: "n8",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
        orderId: "#114782",
        count: "2 items",
      },
    ],
    orderList: [],
  }),
  mounted() {
    this.loadOrderDetails();
  },
  methods: {
    selectNewRecord(index) {
      this.selectedNewIndex = index;
    },
    loadOrderDetails() {
      this.$axios.get("orders/1").then(
        (response) => {
          if (response.status == 200) {
            this.orderList = response.data.orders;
            console.log("status ds", this.orderList);
          } else {
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    },
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        // case "xs":
        //   return 102;
        case "sm":
          return 102;
        case "md":
          return 102;
        case "lg":
          return 120;
        case "xl":
          return 800;
      }
    },
  },
};
</script>
<style scoped>
#noticeBubble {
  display: block;
  left: 1.5%;
  position: absolute;
  top: -41.5%;
  z-index: 1;
}
.newBtnSelected {
  border: 2px solid #aa33bf;
}
</style>
