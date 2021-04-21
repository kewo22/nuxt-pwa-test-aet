<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs1 sm1 md1 style="background-color: #282e35">
        <v-row align="center" justify="center" style="height: 100vh">
          <v-col
            cols="12"
            lg="6"
            md="6"
            class="fill-height d-flex flex-column justify-center align-center"
          >
            left
          </v-col>
        </v-row>
      </v-flex>
      <v-flex xs11 sm11 md11>
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
                            height: 600px;
                            overflow: auto;
                          "
                        >
                          <template>
                            <v-list-item
                              v-for="item in items"
                              :key="item.id"
                              style="height: 100px"
                            >
                              <v-list-item-action @click="selectedOrder = item" style="width: 100%">
                                <v-btn
                                  style="
                                    width: 100%;
                                    background-color: #282e35;
                                    color: #babdbf;
                                    text-transform: none;
                                    height: 75px;
                                  "
                                >
                                  <v-layout>
                                    <v-flex xs4 sm4 md2>
                                      <v-container fill-height fluid>
                                        <v-row align="center" justify="center">
                                          <v-col
                                            align="center"
                                            justify="center"
                                          >
                                            <v-img
                                              :aspect-ratio="16 / 9"
                                              width="100"
                                              :src="item.src"
                                            ></v-img>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-flex>
                                    <v-flex xs4 sm4 md6>
                                      <v-container fill-height fluid>
                                        <v-row align="center" justify="center">
                                          <v-col align="left" justify="center">
                                            {{ item.name }}
                                          </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                          <v-col align="left" justify="center">
                                            {{ item.time }}
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-flex>
                                    <v-flex xs4 sm4 md2>
                                      <v-container fill-height fluid>
                                        <v-row align="center" justify="center">
                                          <v-col
                                            align="center"
                                            justify="center"
                                          >
                                            {{ item.orderId }}
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-flex>
                                    <v-flex xs4 sm4 md2>
                                      <v-container fill-height fluid>
                                        <v-row align="center" justify="center">
                                          <v-col
                                            align="center"
                                            justify="center"
                                          >
                                            {{ item.count }}
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-flex>
                                  </v-layout>
                                </v-btn>
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
import NoOrder from "~/components/orders/NoOrder.vue";
export default {
  components: { OrderDetails, NoOrder },
  data: () => ({
    benched: 0,
    selectedOrder: null,
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
        items: []
      },
      {
        id: 1,
        name: "n2",
        src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        time: "43 Min",
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
  }),
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
</style>
