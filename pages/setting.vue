<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-flex xs6 sm6 md6 style="background-color: #23282c">
            <v-container>
              <v-row>
                <v-col align="left">
                  <div style="width: 90%; background-color: #282e35">
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <div
                          style="
                            width: 100%;
                            background-color: #23282c;
                            height: 700px;
                            overflow: auto;
                          "
                        >
                          <p style="font-size: 18px;font-weight: 398px">
                            Settings
                          </p>
                          <p style="font-size: 13px;font-weight: 100px">
                            Configure the options, schedules and other
                            features<br />
                            of the application
                          </p>
                          <hr />
                          <v-layout mt-3>
                            <v-flex xs12 sm12 md6 class="fontweight">
                              Automatically print order tickets
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col align="right">
                                  <v-img src="/tick.png" width="27px"></v-img>
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout mt-9>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                  >
                                    Load time
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col align="right"
                                  ><v-select class="settingsDrop"
                                    :items="timeIntervals"
                                    label="15 minutes"
                                    solo
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                  >
                                    ticket token size
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col align="right"
                                  ><v-select class="settingsDrop"
                                    :items="ticketFontSizes"
                                    label="8 pt"
                                    solo
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                  >
                                    Print order ticket when
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col align="right"
                                  ><v-select class="settingsDrop"
                                    :items="orderStatus"
                                    label="In progress"
                                    solo
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                  >
                                    Number of tickets to print
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col align="right"
                                  ><v-select class="settingsDrop"
                                    :items="ticketCounts"
                                    label="2"
                                    solo
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                  >
                                    Reload Orders
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters >
                                <v-col align="right" 
                                  ><v-select class="settingsDrop"
                                    :items="reloadIntervals"
                                    label="Every 1 minute"
                                    solo
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                  >
                                    Printers
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col
                                  align="right"
                                  style="color:#4f97d5;text-decoration: underline; font-weight: 500"
                                >
                                  Select Printers
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-card-actions
                            class="justify-center"
                            style="margin-top:5%"
                          >
                            <v-btn
                              style="text-transform:none; background-color:#509ad9;border-radius: 20px; width: 22%;"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>

                          <!-- <v-btn
                            color="primary"
                            align="center"
                            justify="center"
                            style="text-transform:none"
                            >Save</v-btn
                          > -->
                        </div>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-flex>
          <v-flex xs6 sm6 md6 style="background-color: #f6f8fa">
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                  <v-img src="/lineTenLogo.png" width="25%" /><br />
                  <h4 style="color:#b1b3b8">2021 v.1.0.0</h4>
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
  data: () => ({
    timeIntervals: ["15 minutes", "30 minutes", "45 minutes"],
    ticketFontSizes: ["8 pt", "10 pt", "12 pt"],
    orderStatus: ["In progress", "New", "Finished"],
    ticketCounts: ["2", "3", "1"],
    reloadIntervals: ["Every 1 minute", "Every 5 minutes", "Every 10 minutes"]
  }),

  mounted() {},
  methods: {},
  computed: {}
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
.fontweight {
  font-weight: 300;
}

</style>
<style>
.settingsDrop .v-input__slot {
  background-color: #282e35 !important;
}
</style>