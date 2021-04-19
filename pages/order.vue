<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs1 sm1 md1 style="background-color:#282e35">
        <v-row align="center" justify="center" style="height:100vh">
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
          <v-flex xs6 sm6 md6 style="background-color:#23282c">
            <v-layout>
              <v-spacer></v-spacer>
              <v-flex xs4 sm4 md4>
                <v-btn
                  :width="width"
                  style="background-color:#282e35; color:#babdbf; margin-top:10%;text-transform:none"
                  >Search By Id</v-btn
                >
              </v-flex>
            </v-layout>
            <!-- <v-layout style="background-color:#282e35;width:50%" align="center">
                few
            </v-layout> -->
            <v-container>
              <v-row>
                <v-col align="center">
                  <div style="width:50%;background-color:#282e35">
                    <v-layout>
                      <v-flex xs4 sm4 md4>
                        <v-btn
                          style="width:100%;background-color:#282e35; color:#babdbf; text-transform:none"
                        >
                          New
                        </v-btn>
                      <!--  <img id="noticeBubble" src="/green.png" />-->
                      </v-flex>
                      <v-flex xs4 sm4 md4>
                        <v-btn
                          style="width:100%;background-color:#282e35; color:#babdbf; text-transform:none"
                          >In Progress</v-btn
                        >
                      </v-flex>

                      <v-flex xs4 sm4 md4>
                        <v-btn
                          style="width:100%;background-color:#282e35; color:#babdbf; text-transform:none"
                          >Finished</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <!-- <v-layout style="margin:5%; width:50%">
              <v-flex xs12 sm12 md12 style="background-color:#282e35;">
                <v-layout style="padding:1%">
                  <v-flex xs4 sm4 md4>
                    <v-btn
                      style="background-color:#282e35; color:#babdbf; text-transform:none"
                      >New</v-btn
                    >
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-btn
                      style="background-color:#282e35; color:#babdbf; text-transform:none"
                      >In Progress</v-btn
                    >
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-btn
                      style="background-color:#282e35; color:#babdbf; text-transform:none"
                      >Finished</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout> -->
          </v-flex>
          <v-flex xs6 sm6 md6 style="background-color:#f6f8fa;height:100vh">
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                  <img src="/noOrder.png" /><br />
                  <h2 style="margin-top: 4%">NO ORDER SELECTED</h2>
                  <h4 style="color:#c3c5c8; margin-top: 1%">
                    Select an order from the queue on the left
                  </h4>
                </v-col>
              </v-row>
            </v-container>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
    }
  }
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
