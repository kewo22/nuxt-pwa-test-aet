<template>
  <!-- <v-app dark>
    <Nuxt />
  </v-app> -->

  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      expand-on-hover
    > -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
    >
      <v-list dense>
        <div  class="px-2">
          <v-app-bar-nav-icon @click.stop="mini = !mini , isFilter = false"></v-app-bar-nav-icon>
        </div>
        <v-list-item v-for="item in items" :key="item.title" @click="showTab(item.title)" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-if="isFilter">
        <v-list dense>
          <v-list-item>
            <div class="w-100">
              <h2 class="mb-4">Filters</h2>
              <p class="font-weight-light subTitle">ORDER TYPE</p>
              <div class="d-flex justify-center flex-column mb-1 w-100">
                <v-btn
                  class="mb-3 rounded-pill orderTypeBtn"
                  x-large
                  outlined
                  color="primary"
                >
                  Both
                </v-btn>
                <v-btn
                  class="mb-3 rounded-pill orderTypeBtn"
                  x-large
                  outlined
                  color="primary"
                >
                  Pickup
                </v-btn>
                <v-btn
                  class=" rounded-pill orderTypeBtn"
                  x-large
                  outlined
                  color="primary"
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
                  solo
                ></v-select>
              <v-divider></v-divider>
            </div>
          </v-list-item>
          <v-list-item>
            <div class="w-100">
              <div>
                  <p class="font-weight-light ma-2 subTitle">CHANNElS</p>
                <div class="d-flex justify-space-between align-baseline mb-1">
                  <span class="float-left channelName">All Channels</span>
                  <v-checkbox
                    v-model="allChannels"
                    color="primary"
                    class="float-left"
                    hide-details
                  ></v-checkbox>
                </div>
                <div v-for="item in channels" :key="item.id" class="d-flex justify-space-between align-baseline mb-1">
                  <span class="float-left channelName">{{item.name}}</span>
                  <v-checkbox
                    :v-model="item.name"
                    color="primary"
                    class="float-left"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
        <div id="line10Logo" class="d-flex justify-center align-center">
          <img src="../assets/LineTen Logo Standard.png" alt="">
        </div>
      </div>
    </v-navigation-drawer>

    <!-- <v-app-bar app> -->
    <!-- -->
    <!-- </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
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

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Filter", icon: "mdi-filter" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      channels:[],
      allChannels:"",
      overflow_items:["Item 1","Item 2","Item 3","Item 4","Item 5"],
      clipped: true,
      expand: false,
      isFilter: false,
      mini: true
    };
  },
  mounted() {
    this.getMarketplacesList();
  },
  methods: {
    getMarketplacesList(){
      this.$axios
        .get("marketplaces/0")
        .then(
          response => {
            if (response.status == 200) {
              this.channels = response.data.marketplaces;
            }
          },
          error => {
            console.log("error", error);
          }
        );
    },
    showTab:function(tab){
      if (tab === "Filter") {
        if (this.isFilter === false) {
          this.isFilter = true;
        } else {
          this.isFilter = false;
        }
        
      }
    }
  },
};
</script>

<style scoped>
.subTitle {
  font-size: 0.95rem ;
  letter-spacing: 0.04em;
}

h2 {
  letter-spacing: 0.06em;
}

.channelName {
  color: #42A5F5;
}

#line10Logo {
  height: 200px;
  background-color: white;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

#line10Logo img{
  height: 30%;
}

.orderTypeBtn:hover {
  background-color: #42A5F5 !important;
  border:#42A5F5 !important;
  color: white !important;
}

.w-100 {
  width: 100%;
}
</style>
