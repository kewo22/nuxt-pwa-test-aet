<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-flex xs6 sm6 md6 style="background-color: #23282c">
            <v-alert v-model="isSavedSuccess" dismissible type="success"
              >Settings data saved successfully</v-alert
            >
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
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    :checked="isPrintChecked"
                                    @click="changeIsPrintValue"
                                    style="width:40px;height:40px;"
                                  />
                                </v-col>
                              </v-row>
                            </v-flex>
                          </v-layout>
                          <v-layout mt-3>
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
                                  ><v-select
                                    class="settingsDrop"
                                    :items="timeIntervals"
                                    v-model="selectedTimeInterval"
                                    solo
                                    @input="setTimeIntervalDrop"
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
                                  ><v-select
                                    class="settingsDrop"
                                    :items="ticketFontSizes"
                                    v-model="selectedTicketFontSize"
                                    solo
                                    @input="setTicketFontSizesDrop"
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
                                  ><v-select
                                    class="settingsDrop"
                                    :items="orderStatus"
                                    v-model="selectedOrderStatus"
                                    @input="setOrderStatusDrop"
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
                                  ><v-select
                                    class="settingsDrop"
                                    :items="ticketCounts"
                                    v-model="selectedTicketCount"
                                    @input="setTicketCountDrop"
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
                              <v-row no-gutters>
                                <v-col align="right"
                                  ><v-select
                                    class="settingsDrop"
                                    :items="reloadIntervals"
                                    v-model="selectedReloadInterval"
                                    @input="setReloadIntervalDrop"
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
                          <v-layout mt-10>
                            <v-flex xs12 sm12 md6>
                              <div>
                                <v-row align="center" justify="center">
                                  <v-col
                                    align="left"
                                    justify="center"
                                    class="fontweight"
                                    style="color:#F09D00;text-decoration: underline;"
                                  >
                                    <p @click="isResetPopup = true">
                                      Reset to default settings
                                    </p>
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                          </v-layout>
                          <v-card-actions mt-2 class="justify-center">
                            <v-btn
                              @click="saveSettings"
                              style="margin-top:4%;text-transform:none; background-color:#509ad9;border-radius: 20px; width: 22%;"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-flex>
          <v-dialog v-model="isResetPopup" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Confirm Action
              </v-card-title>

              <v-card-text>
                Please confirm that you wish to reset the settings back to it’s
                default configuration.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="isResetPopup = false">
                  Close
                </v-btn>
                <v-btn color="primary" text @click="resetSettingData">
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
    orderStatus: ["New", "In progress", "Finished"],
    ticketCounts: ["1", "2", "3"],
    reloadIntervals: ["Every 1 minute", "Every 5 minutes", "Every 10 minutes"],
    settingData: {},
    isPrintChecked: "",
    selectedTimeInterval: "",
    selectedTicketFontSize: "",
    selectedOrderStatus: "",
    selectedTicketCount: "",
    selectedReloadInterval: "",
    isResetPopup: false,
    isSavedSuccess: false
  }),

  mounted() {
    this.loadSettingData();
  },
  methods: {
    async loadSettingData() {
      this.settingData = (await this.$idb.get("settingData")) || [];
      if (this.settingData.length == 0) {
        this.isPrintChecked = true;
      } else {
        this.settingData.isPrintChecked
          ? (this.isPrintChecked = true)
          : (this.isPrintChecked = false);
      }

      this.selectedTimeInterval =
        this.settingData.selectedTimeInterval || "15 minutes";
      this.selectedTicketFontSize =
        this.settingData.selectedTicketFontSize || "8 pt";
      this.selectedOrderStatus = this.settingData.selectedOrderStatus || "New";
      this.selectedTicketCount = this.settingData.selectedTicketCount || "1";
      this.selectedReloadInterval =
        this.settingData.selectedReloadInterval || "Every 1 minute";
    },
    saveSettings() {
      this.isPrintChecked
        ? (this.settingData.isPrintChecked = 1)
        : (this.settingData.isPrintChecked = 0);

      this.settingData = {
        isPrintChecked: this.isPrintChecked,
        selectedTimeInterval: this.selectedTimeInterval,
        selectedTicketFontSize: this.selectedTicketFontSize,
        selectedOrderStatus: this.selectedOrderStatus,
        selectedTicketCount: this.selectedTicketCount,
        selectedReloadInterval: this.selectedReloadInterval
      };

      this.$idb.set("settingData", this.settingData);
      this.isSavedSuccess = true;
    },

    changeIsPrintValue: function(e) {
      this.isPrintChecked = e.target.checked;
    },

    setTimeIntervalDrop(value) {
      this.selectedTimeInterval = value;
    },
    setTicketFontSizesDrop(value) {
      this.selectedTicketFontSize = value;
    },
    setOrderStatusDrop(value) {
      this.selectedOrderStatus = value;
    },
    setTicketCountDrop(value) {
      this.selectedTicketCount = value;
    },
    setReloadIntervalDrop(value) {
      this.selectedReloadInterval = value;
    },
    resetSettingData() {
      this.isPrintChecked = true;
      this.selectedTimeInterval = "15 minutes";
      this.selectedTicketFontSize = "8 pt";
      this.selectedOrderStatus = "New";
      this.selectedTicketCount = "1";
      this.selectedReloadInterval = "Every 1 minute";
      this.isResetPopup = false;

      this.saveSettings();
    }
    // resetSettingData: function(e) {
    //   this.$nextTick(() => {
    //     this.isPrintChecked = true;
    //     this.selectedTimeInterval = "15 minutes";
    //     this.selectedTicketFontSize = "1";
    //     this.selectedOrderStatus = "New";
    //     this.selectedTicketCount = "1";
    //     this.selectedReloadInterval = "Every 1 minute";
    //     this.isResetPopup = false;

    //     this.saveSettings();
    //   });
    // }
  },
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
.settingsDrop .v-input__control {
  min-height: 40px !important;
}
</style>
