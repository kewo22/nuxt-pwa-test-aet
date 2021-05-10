<template>
  <!-- <v-app dark>
    <Nuxt />
  </v-app> -->

  <v-app dark>
    <v-navigation-drawer v-model="drawer" app absolute expand-on-hover>
      <!-- <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
    > -->
      <v-list dense>
        <!-- <div  class="px-2">
          <v-app-bar-nav-icon @click.stop="mini = !mini , isFilter = false"></v-app-bar-nav-icon>
        </div> -->
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="showTab(item.title)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <NuxtLink :to="item.route"> {{ item.title }} </NuxtLink>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          ><v-btn elevation="2" small @click="onLogoutClick"
            >Logout</v-btn
          ></v-list-item
        >
      </v-list>
      <!-- Below line commented to avoid rendering filter section -->
      <!-- <div v-if="isFilter"> -->
      <div v-if="false">
        <v-list dense>
          <v-list-item>
            <div class="w-100">
              <h2 class="mb-4">Filters</h2>
              <p class="font-weight-light subTitle">ORDER TYPE</p>
              <div class="d-flex justify-center flex-column mb-1 w-100">
                <v-btn
                  class="mb-3 rounded-pill orderTypeBtn"
                  x-large
                  :outlined="BothOL"
                  color="primary"
                  @click="filterOrderType('Both')"
                >
                  Both
                </v-btn>
                <v-btn
                  class="mb-3 rounded-pill orderTypeBtn"
                  x-large
                  :outlined="pickupOL"
                  color="primary"
                  @click="filterOrderType('Pickup')"
                >
                  Pickup
                </v-btn>
                <v-btn
                  class="mb-4 rounded-pill orderTypeBtn"
                  x-large
                  :outlined="deliveryOL"
                  color="primary"
                  id="delivery"
                  @click="filterOrderType('Delivery')"
                >
                  Delivery
                </v-btn>
              </div>
            </div>
          </v-list-item>
          <v-list-item class="mt-0">
            <div class="w-100">
              <v-divider></v-divider>
              <v-select
                class="mt-6"
                :items="overflow_items"
                label="Date-latest"
                v-model="dateLatest"
                @change="filterDateLatest(dateLatest)"
                solo
              ></v-select>
              <v-divider></v-divider>
            </div>
          </v-list-item>
          <v-list-item class="mt-4">
            <div class="w-100">
              <div>
                <p class="font-weight-light my-2 subTitle">CHANNELS</p>
                <div class="d-flex justify-space-between align-baseline mb-1">
                  <span class="float-left channelName">All Channels</span>
                  <v-checkbox
                    v-model="allChannels"
                    value="All Channels"
                    color="primary"
                    class="float-left"
                    @click="filterChannels(allChannels)"
                    hide-details
                  ></v-checkbox>
                </div>
                <div
                  v-for="item in channels"
                  :key="item.id"
                  class="d-flex justify-space-between align-baseline mb-1"
                >
                  <span class="float-left channelName">{{ item.name }}</span>
                  <v-checkbox
                    v-model="selected"
                    :value="item.name"
                    color="primary"
                    class="float-left"
                    @click="filterChannels(selected)"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
        <div id="line10Logo" class="d-flex justify-center align-center mt-4">
          <img src="~/assets/LineTen Logo Standard.png" alt="" />
        </div>
      </div>
    </v-navigation-drawer>

    <!-- <v-app-bar app> -->
    <!-- -->
    <!-- </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fill-height fluid class="pa-0">
        <!-- If using vue-router -->
        <!-- <router-view></router-view> -->
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer app>
      FOOTER
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Orders",
          icon: "mdi-format-list-bulleted-square",
          route: "/orders",
        },
        { title: "Filters", icon: "mdi-filter", route: "/order" },
        { title: "Settings", icon: "mdi-cog", route: "/setting" },
      ],
      channels: [],
      orders: [],
      tempOrders: [],
      orderType: [],
      filterOrderData: [],
      allChannels: "All Channels",
      selected: [],
      overflow_items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      dateLatest: "",
      clipped: true,
      expand: false,
      isFilter: false,
      mini: true,
      BothOL: false,
      pickupOL: true,
      deliveryOL: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("getUsersForIndexedDb");
    this.getMarketplacesList();
    this.filterOrderType();
    this.filterChannels();
    await this.$store.dispatch("authorizeClientApp");
  },
  methods: {
    ...mapActions(["authorizeClientApp"]),
    getMarketplacesList() {
      this.$axios.get("marketplaces/0").then(
        (response) => {
          if (response.status == 200) {
            this.channels = response.data.marketplaces;
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    },
    async getOrders(filterType) {
      try {
        const orders = await this.$axios.$get("http://localhost:3004/orders");
        this.allOrders = orders;
        this.filterOrderData = orders;
        let orderTypeData = orders;
        let channelDataArray = orders;
        let type = localStorage.getItem("filterOrderType");
        let channel = localStorage.getItem("filterChannels");
        if (filterType !== undefined) {
          if (type !== "Both") {
            if (type === "Delivery") {
              orderTypeData = orders.filter((order) => {
                return order.fulfilment_type === type;
              });
            } else {
              orderTypeData = orders.filter((order) => {
                return (
                  order.fulfilment_type === "walk-in" ||
                  order.fulfilment_type === "collection"
                );
              });
            }
          }
          if (channel !== "All Channels") {
            channelDataArray = [];
            let arr = channel.split(",");
            for (let index = 0; index < arr.length; index++) {
              let element = arr[index];
              orderTypeData.filter((order) => {
                if (order.fulfilment_source === element) {
                  channelDataArray.push(order);
                  return channelDataArray;
                }
              });
            }
          } else {
            channelDataArray = orderTypeData;
          }
          this.filterOrderData = channelDataArray;
          console.log("this.filterOrderData", this.filterOrderData);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showTab: function (tab) {
      if (tab === "Filters") {
        if (this.isFilter === false) {
          this.isFilter = true;
        } else {
          this.isFilter = false;
        }
      }
    },
    filterOrderType: function (type) {
      if (type === undefined) {
        if (localStorage.getItem("filterOrderType")) {
          type = localStorage.getItem("filterOrderType");
        } else {
          localStorage.setItem("filterOrderType", "Both");
          type = localStorage.getItem("filterOrderType");
        }
      }
      if (type == "Both") {
        this.BothOL = false;
        this.pickupOL = true;
        this.deliveryOL = true;
        localStorage.setItem("filterOrderType", "Both");
        this.getOrders("OrderType");
      } else if (type == "Pickup") {
        this.BothOL = true;
        this.pickupOL = false;
        this.deliveryOL = true;
        localStorage.setItem("filterOrderType", type);
        this.getOrders("OrderType");
      } else {
        this.BothOL = true;
        this.pickupOL = true;
        this.deliveryOL = false;
        localStorage.setItem("filterOrderType", type);
        this.getOrders("OrderType");
      }
    },
    filterChannels: function (channel) {
      if (channel === undefined) {
        if (localStorage.getItem("filterChannels")) {
          channel = localStorage.getItem("filterChannels");
          if (localStorage.getItem("filterChannels") !== "All Channels") {
            channel = localStorage.getItem("filterChannels").split(",");
            this.selected = channel;
          }
        } else {
          localStorage.setItem("filterChannels", "All Channels");
          channel = localStorage.getItem("filterChannels");
        }
      }
      let checkType = channel;
      if (typeof checkType === "object" && checkType !== null) {
        this.allChannels = "";
        localStorage.setItem("filterChannels", channel);
        this.getOrders("channels");
      }
      if (checkType === "All Channels") {
        this.selected = [];
        localStorage.setItem("filterChannels", "All Channels");
        this.getOrders("channels");
      }
    },
    filterDateLatest: function (date) {
      window.alert(date);
    },
    onLogoutClick() {
      this.$store.dispatch("setUser", {});
      this.$router.push('/login')
    },
  },
};
</script>

<style scoped>
.subTitle {
  font-size: 0.95rem;
  letter-spacing: 0.04em;
}

h2 {
  letter-spacing: 0.06em;
}

.channelName {
  color: #42a5f5;
}

#line10Logo {
  height: 200px;
  background-color: white;
}

#line10Logo img {
  height: 30%;
}

.w-100 {
  width: 100%;
}
</style>
