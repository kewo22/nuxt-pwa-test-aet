<template>
  <v-container class="pa-0" fluid>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-flex xs6 sm6 md6 style="background-color: #23282c">
            <v-alert
              style="position:absolute;width:49%"
              dismissible
              type="success"
              :value="isSavedSuccess"
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
                                    class="regular-checkbox"
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
                                    Lead time
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
                                    Ticket font size
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
                                    Reload orders
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
                                    Order history duration
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col align="right"
                                  ><v-select
                                    class="settingsDrop"
                                    :items="historyDurationIntervals"
                                    v-model="selectedHistoryDurationInterval"
                                    @input="setHistoryDurationIntervalDrop"
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
                                    Order history clear time
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col>
                                  <input
                                    type="time"
                                    id="appt"
                                    name="appt"
                                    class="a"
                                    style="color:white; margin-left:3%"
                                    v-model="selectedOrderHistoryClearTime"
                                  />
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
                                  >
                                    Clear all queues
                                  </v-col>
                                </v-row>
                              </div>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <v-row no-gutters>
                                <v-col
                                  align="right"
                                  style="color:red;text-decoration: underline; font-weight: 500"
                                >
                                  <a
                                    style="color:red;text-decoration: underline;"
                                    @click="isClearAllQueuesPopup = true"
                                  >
                                    Clear Now
                                  </a>
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
                                  >
                                    <a
                                      style="color:#F09D00;text-decoration: underline;"
                                      @click="isResetPopup = true"
                                    >
                                      Reset to default settings
                                    </a>
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
            <v-card style="background-color: #FFFFFF !important">
              <v-card-title
                style="color:black; border-bottom: 1px solid #CCCED0;"
              >
                <div>
                  <font-awesome-icon
                    :icon="['fa', 'question-circle']"
                  ></font-awesome-icon>

                  <span>Confirm Action</span>
                </div>
              </v-card-title>

              <v-card-text style="color:black;margin-top:2%">
                <p>
                  Please confirm that you wish to reset the settings back to
                  it’s default configuration.
                </p>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="justify-center">
                <v-btn
                  color="primary"
                  class="confirmPopBtn"
                  text
                  style="color:black !important"
                  @click="isResetPopup = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="primary"
                  class="confirmPopBtn"
                  style="background-color:#2F3940;color:white !important"
                  text
                  @click="resetSettingData"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="isClearAllQueuesPopup" width="500">
            <v-card style="background-color: #FFFFFF !important">
              <v-card-title
                style="color:black; border-bottom: 1px solid #CCCED0;"
              >
                <div>
                  <font-awesome-icon
                    :icon="['fa', 'question-circle']"
                  ></font-awesome-icon>

                  <span>Confirm Action</span>
                </div>
              </v-card-title>

              <v-card-text style="color:black;margin-top:2%">
                <p>
                  Please confirm that you wish to clear all order queues. This
                  action cannot be reverted.
                </p>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="justify-center">
                <v-btn
                  color="primary"
                  class="confirmPopBtn"
                  text
                  style="color:black !important"
                  @click="isClearAllQueuesPopup = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="primary"
                  class="confirmPopBtn"
                  style="background-color:#2F3940;color:white !important"
                  text
                  @click="clearAllQueues"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-flex xs6 sm6 md6 style="background-color: #f6f8fa">
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                  <v-img
                    :src="require('~/assets/LineTen Logo Standard.png')"
                    width="25%"
                  /><br />
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
    timeIntervals: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "20 minutes",
      "25 minutes"
    ],
    ticketFontSizes: ["8 pt", "10 pt", "12 pt"],
    orderStatus: ["In progress", "New", "Finished"],
    ticketCounts: ["1", "2", "3"],
    reloadIntervals: ["Every 1 minute", "Every 5 minutes", "Every 10 minutes"],
    historyDurationIntervals: ["24 hours", "48 hours"],
    settingData: {},
    isPrintChecked: "",
    selectedTimeInterval: "",
    selectedTicketFontSize: "",
    selectedOrderStatus: "",
    selectedTicketCount: "",
    selectedReloadInterval: "",
    selectedHistoryDurationInterval: "",
    isResetPopup: false,
    isClearAllQueuesPopup: false,
    isSavedSuccess: false,
    selectedOrderHistoryClearTime: "10:00"
  }),

  mounted() {
    this.loadSettingData();
  },

  watch: {
    isSavedSuccess(new_val) {
      if (new_val) {
        setTimeout(() => {
          this.isSavedSuccess = false;
        }, 3000);
      }
    }
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
        this.settingData.selectedTimeInterval || "5 minutes";
      this.selectedTicketFontSize =
        this.settingData.selectedTicketFontSize || "8 pt";
      this.selectedOrderStatus =
        this.settingData.selectedOrderStatus || "In progress";
      this.selectedTicketCount = this.settingData.selectedTicketCount || "1";
      this.selectedReloadInterval =
        this.settingData.selectedReloadInterval || "Every 1 minute";
      this.selectedHistoryDurationInterval =
        this.settingData.selectedHistoryDurationInterval || "24 hours";
      this.selectedOrderHistoryClearTime =
        this.settingData.selectedOrderHistoryClearTime || "10:00";
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
        selectedReloadInterval: this.selectedReloadInterval,
        selectedHistoryDurationInterval: this.selectedHistoryDurationInterval,
        selectedOrderHistoryClearTime: this.selectedOrderHistoryClearTime
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
    setHistoryDurationIntervalDrop(value) {
      this.selectedHistoryDurationInterval = value;
    },
    resetSettingData() {
      this.isPrintChecked = true;
      this.selectedTimeInterval = "5 minutes";
      this.selectedTicketFontSize = "8 pt";
      this.selectedOrderStatus = "In progress";
      this.selectedTicketCount = "1";
      this.selectedReloadInterval = "Every 1 minute";
      this.selectedHistoryDurationInterval = "24 hours";
      this.selectedOrderHistoryClearTime = "10:00";
      this.isResetPopup = false;

      this.saveSettings();
    },
    clearAllQueues() {
      this.$store.commit("orders/clearAllQueues");
      this.$store.commit("orders/setIsAllQueuesClear", true);
      this.isClearAllQueuesPopup = false;
    }
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
.confirmPopBtn {
  border: 2px solid black;
  width: 25%;
  border-radius: 15px;
  text-transform: none;
}

.regular-checkbox {
  background-color: #ffffff;
  -webkit-appearance: none;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}
.regular-checkbox:active,
.regular-checkbox:checked:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.regular-checkbox:checked {
  background-color: #23282c;
  border: 1px solid #509ad9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
    inset 15px 10px -12px rgba(255, 255, 255, 0.1);
}
.regular-checkbox:checked:after {
  content: "\2714";
  font-size: 20px;
  position: absolute;
  color: #509ad9;
  text-align: center;
  top: 6px;
}
.a {
position: relative;
/* height: 68px; */
}
.a::-webkit-calendar-picker-indicator {
  background-color:white;
    /* width: 64px;
    height: 64px; */
    /* background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEr0lEQVR4nO2af2hVZRjHP88550I/zNrCiLaUpBYkJYYWNmtFUU3UchPJzGGJs1oRhRDDJkWaYLAERdugZG70hwyj1BY0Y6VWWCEUEqbVH1v900hI/8ndc57+uLvRLtvded9zzr2i5wOXcc7e9/k+93mf57nnPedASkpKSsqli5TbgZkv6fTsCFsR6oDrLc2cVej3Alp/2yUnTSaWNQA3Pae3InwNVMRiUPjLdZh9ersMhZ3ixSJsiSdsUaUC6HOUtb6DI0o3UCfQdWqXrA5j5+YXtZosnSj1BLQDy8P64Ni5Hg+uz4NeAIzQ/PO78vsvO2XQ8XnWC8ANeDSsndPbZegyYZ0XgBfwiIkPViUwa50uJuAVhHnAlTY2QqAnOsVogWY1qwKc6JTQ38u4BO5Yq2/h0wqAms42wnhx3MBcxCgAd67RxRrQCpwXaFOl5/j78oe5bHHmrFGr0LoWs4wC4ObSHhE2HntPtprLhXTKMrNs5pkGYC4CrkM3wN2rdaEoHQjV5tJFsEhlKEEJuDAFhaOjaZ9ROhSqE+4FoSlFCYzBCXIr/2V3+K4bhvtWWfaApDOgsMZsa9VUJ8l5kTLAJuI2OknOMwuAFj+OC1u7ifeAtATSEih+nGfDYT2KcE9Is0c2L5B7w9htXK6Po6xSUFW6P+yVj8LMK0YiGVDph/7yAAsm0wFY3qgt6rPjf6caly3Tlt5e2TmZP8Uw2m15OrbOCo/zVI6YfSbTWdmgta7yTv68B695imYCtq1s0NrJ/Cn6nUwGhy2Ba7NmToyjcxa46skGnRFkGRFlrwuZ/P979snmp5bqNcB6YO8TS3Se45Fxcv78baKVTAlEDYDPAYQVLvyAAAFTgQHg/vyYoTO0zria9cANrvATfm77rHDARCuRDKjMcoRxansCDheeuMKn5R+XCsjdFVL4zHdZ4fkM58cMDEj2mSX/OTB19G9f4NASUhcwvQ4Iih/nuW3p2K5uyq6Dcgaof7pep0mGzO6Pc5uv5kVjI57XH/G5LuOhnftluNDWZFyQV4J5dvfJn2H0OwvGmZBIAF5YaLab2/FJuN1kEguQSAlMdD4qYfWNbJoMDrsC2z6N9/6Aqb4JF+ReoJT6iWRA60N2d3QK2dI/NpPKngFpDwi5Am9+frH2gBJfB5RCP22CRoNLdEuslPppBhg5cKn3gHFScAio3jE/nt/9SVFAGJzIHxuiPRpTmkXpAG6M7kooBsWheSJ/bIhUAs9/I33A9Ohu2FH2n8Fy0jVfq7Lj3FA1JVIPKCd6nqY4XnGLVALloGu2VrkeTSivx2HPqgQ+mKN1orwKzAWmxeGIEX58puwyQBmIzwVjhoHvRXlbhf6oxmy3w+cF2hyPnseOx/+WWFj23R69Jq0yQISNS35M7i2xsJRtO+z57IkuHZ04AmD2cDTgnBeAE5T/Nfv9NVo1+m6w0bPAQowC4CrfugoiNEURjYPLHZrc3NPg76LYMWuCPu0qPAC8cahG8YU9D58sbRM8VKNVAk0Eo9cBSnsUe8ap/MUtugnYEEU0RjbVnZK2KAasavmrmbpIhZeBu4ApURyw4BxwDKW99lc5WGLtlJSUlJSLin8BxSm4QhC/BVoAAAAASUVORK5CYII="); */
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
