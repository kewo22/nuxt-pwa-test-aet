import moment from "moment";

export const state = () => ({
  allorders: [],
  ordersFromIndexedDb: [],
  newOrders: [],
  inProgressOrders: [],
  leadTime: "",
  tempNewOrders: [],
  tempInProgressOrders: [],
  tempFinishedOrders: [],
  finishedOrders: [],
  selectedOrder: null,
  isSelectorOrderExecutedFirst: false,
  lastSyncTime: "",
  isAllQueuesClear: ""
});

export const mutations = {
  setOrdersData(state, orders) {
    if (orders.length != 0) {
      if (state.allorders && state.allorders.length != 0) {
        let i = 0;
        state.allorders.forEach(item => {
          if (item.status == "in progress" && orders[i].status == "cancelled") {
            item.cancelled = true;
          }
          if (item.status != "submitted") {
            // console.log("orders[i]",orders[i])
            orders[i].status = item.status; //keep latest status even new request coming old status
          }
          let objKeys = Object.keys(orders[i]);
          for (let j = 0; j < objKeys.length; j++) {
            item[objKeys[j]] = orders[i][objKeys[j]];
          }
          i++;
        });
      } else {
        state.allorders = orders;
      }

      for (let m = 0; m < orders.length; m++) {
        let index = state.allorders.findIndex(
          x => x.order_id == orders[m].order_id
        );
        if (index === -1) {
          state.allorders.push(orders[m]);
        }
      }
    }

    this.$idb.set("allorders", state.allorders || []);
  },
  setOrdersFromIndexedDb(state, orders) {
    state.ordersFromIndexedDb = orders;
  },
  setOrdersFromVuexStore(state, orders) {
    state.allorders = orders;
  },
  setNewOrdersData(state, orders) {
    state.newOrders = orders;
  },
  setInProgressOrdersData(state, orders) {
    state.inProgressOrders = orders;
  },
  setFinishedOrdersData(state, orders) {
    state.finishedOrders = orders;
  },
  moveCancelOrdersToFinished(state) {
    for (let i = 0; i < state.allorders.length; i++) {
      if (state.allorders[i].status == "cancelled") {
        state.allorders[i].status = "finished";
        state.allorders[i].cancelled = true;
        state.allorders[i].timeStampForOrders = moment().format();
      }
    }
  },
  calculatePickupTime(state) {
    for (let i = 0; i < state.allorders.length; i++) {
      var pos_fulfilment_time = moment(state.allorders[i].pos_fulfilment_time);
      var today = moment();
      var pickupTimeInMinutes = pos_fulfilment_time.diff(today, "minutes");

      var pickupTime;
      // var pickupTimeWithSeconds;

      var h = Math.floor(pickupTimeInMinutes / 60);
      var m = Math.floor(pickupTimeInMinutes % 60);
      // var s = Math.floor(m / 60);

      if (h != 0) {
        if (h < 0) {
          h++;
          if (h == 0) {
            pickupTime = m + " Min";
          } else {
            pickupTime = h + " hr " + m + " Min";
          }
        } else {
          pickupTime = h + " hr " + m + " Min";
        }
      } else {
        pickupTime = m + " Min";
      }

      if (pickupTimeInMinutes < 0) {
        state.allorders[i].overdue = true;
      } else {
        state.allorders[i].overdue = false;
      }

      // h != 0
      //   ? (pickupTimeWithSeconds = h + " hr " + m + " Min " + s + " Seconds")
      //   : (pickupTimeWithSeconds = m + " Min" + s + " Seconds");

      state.allorders[i].pickupTime = pickupTime;
      state.allorders[i].pickupTimeInMinutes = pickupTimeInMinutes;
      // orders[i].pickupTimeWithSeconds = pickupTimeWithSeconds;
    }
  },
  saveMovdeOrdersManually(state, requestPayLoad) {
    if (requestPayLoad.nextState == "finished") {
      requestPayLoad.order.timeStampForOrders = moment().format();
    }
    for (let i = 0; i < state.allorders.length; i++) {
      if (
        state.allorders[i].order_number == requestPayLoad.order.order_number
      ) {
        state.allorders[i].status = requestPayLoad.nextState;
      }
    }
  },
  moveOrdersToInProgress(state) {
    //need to get lead time
    let leadTimeInMinutes = parseInt(state.leadTime.split(" ")[0]);
    var isMoved = false;
    for (let i = 0; i < state.newOrders.length; i++) {
      // console.log("state.newOrders[i].pickupTimeInMinutes",state.newOrders[i].pickupTimeInMinutes)
      // console.log("leadTimeInMinutes",leadTimeInMinutes);
      if (state.newOrders[i].pickupTimeInMinutes <= leadTimeInMinutes) {
        for (let j = 0; j < state.allorders.length; j++) {
          if (state.allorders[j].order_id == state.newOrders[i].order_id) {
            state.allorders[j].status = "in progress";
            state.newOrders[i].status = "in progress";
            // console.log("fe")
            isMoved = true;
            break;
          }
        }
      }
    }
    // if (isMoved) {
    //   //call filter
    //   //set data
    //   return orders.filter(order => {
    //     return order.status === "new";
    //   });
    // } else {
    //   return orders;
    // }
  },
  moveOrdersToInProgressAuto(state, requestPayLoad) {
    let leadTimeInMinutes = parseInt(state.leadTime.split(" ")[0]);

    for (let i = 0; i < state.allorders.length; i++) {
      if (state.allorders[i].order_number == requestPayLoad.order_number) {
        state.allorders[i].pickupTimeInMinutes =
          requestPayLoad.pickupTimeInMinutes;

        if (state.allorders[i].pickupTimeInMinutes == leadTimeInMinutes) {
          state.allorders[i].status = "in progress";
          state.allorders[i].pickupTime = leadTimeInMinutes + " Min";
          state.allorders[i].pickupTimeInMinutes = leadTimeInMinutes;
          state.newOrders = state.allorders
            .filter(order => {
              return order.status === "submitted";
            })
            .sort(function(a, b) {
              return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
            });

          state.inProgressOrders = state.allorders
            .filter(order => {
              return order.status === "in progress";
            })
            .sort(function(a, b) {
              return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
            });
        }
        break;
      }
    }
  },
  setLeadTime(state, leadTime) {
    state.leadTime = leadTime;
  },
  sortNewOrders(state) {
    state.newOrders.sort(function(a, b) {
      return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
    });
  },
  sortInProgressOrders(state) {
    state.inProgressOrders.sort(function(a, b) {
      return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
    });
  },
  sortFinishedOrders(state) {
    state.finishedOrders.sort(function(a, b) {
      return moment(b.timeStampForOrders).diff(a.timeStampForOrders);
    });
  },

  setTempNewOrders(state, tempNewOrders) {
    state.tempNewOrders = tempNewOrders;
  },
  setTempInProgressOrders(state, tempInProgressOrders) {
    state.tempInProgressOrders = tempInProgressOrders;
  },
  setTempFinishedOrders(state, tempFinishedOrders) {
    state.tempFinishedOrders = tempFinishedOrders;
  },
  setSelectedOrders(state) {
    state.selectedOrder = state.newOrders[0];
    state.isSelectorOrderExecutedFirst = true;
  },
  setLastSyncTime(state, lastSyncTime) {
    state.lastSyncTime = lastSyncTime;
    this.$idb.set("lastSyncTime", lastSyncTime);
  },
  clearAllQueues(state) {
    state.allorders = [];
    state.ordersFromIndexedDb = [];
    state.newOrders = [];
    state.inProgressOrders = [];
    state.finishedOrders = [];
    this.$idb.set("allorders", []);
    // this.$idb.set("lastSyncTime", "");
  },
  setIsAllQueuesClear(state, isAllQueuesClear) {
    state.isAllQueuesClear = isAllQueuesClear;
    this.$idb.set("isAllQueuesClear", isAllQueuesClear);
  }
};

export const getters = {
  getAllOrders: state => {
    return state.allorders;
  },
  getNewStateOrders: state => {
    return state.allorders
      .filter(order => {
        return order.status === "submitted";
      })
      .sort(function(a, b) {
        return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
      });
  },
  getInProgressOrders: state => {
    return state.inProgressOrders;
  },
  getFinishedOrders: state => {
    return state.finishedOrders;
  },
  getSelectedOrders: state => {
    return state.selectedOrder;
  },
  getLastSyncTime: state => {
    return state.lastSyncTime;
  },
  getIsAllQueuesClear: state => {
    return state.isAllQueuesClear;
  }
};
let peiodicAPICallStart;
export const actions = {
  async getInitialOrders(
    { state, dispatch },
    flagObject = { isFromSetting: false, isRemovedFinishOrders: false }
  ) {
    let lastSyncTime =
      this.getLastSyncTime || (await this.$idb.get("lastSyncTime"));
    let isAllQueuesClear = state.isAllQueuesClear;
    let settingData = (await this.$idb.get("settingData")) || [];
    let selectedReloadInterval = settingData.selectedReloadInterval;
    selectedReloadInterval
      ? (selectedReloadInterval = selectedReloadInterval.split(" ")[1])
      : (selectedReloadInterval = 1);
    selectedReloadInterval = parseInt(selectedReloadInterval) * 60000;

    console.log("isRemovedFinishOrders", flagObject.isRemovedFinishOrders);
    console.log("isFromSetting", flagObject.isFromSetting);

    if (lastSyncTime && isAllQueuesClear == false) {
      if (flagObject.isFromSetting) {
        if (peiodicAPICallStart) {
          clearInterval(peiodicAPICallStart);
        }
      } else {
        await dispatch("getOrdersNew",  flagObject = {
          isFromAutoCallingApi: true,
          isRemovedFinishOrders: flagObject.isRemovedFinishOrders
        });
      }
      peiodicAPICallStart = setInterval(
        peiodicAPICallStartFunction,
        selectedReloadInterval
      );

      async function peiodicAPICallStartFunction() {
        await dispatch("getOrdersNew", flagObject = {
          isFromAutoCallingApi: true,
          isRemovedFinishOrders: flagObject.isRemovedFinishOrders
        });
      }
      // setInterval(async () => {
      //   await dispatch("getOrdersNew", true);
      // }, selectedReloadInterval);
    } else {
      if (isAllQueuesClear == false) {
        if (flagObject.isFromSetting) {
          if (peiodicAPICallStart) {
            clearInterval(peiodicAPICallStart);
          }
        } else {
          await dispatch("getOrdersNew", flagObject = {
            isFromAutoCallingApi: false,
            isRemovedFinishOrders: flagObject.isRemovedFinishOrders
          });
        }
        peiodicAPICallStart = setInterval(
          peiodicAPICallStartFunction,
          selectedReloadInterval
        );

        async function peiodicAPICallStartFunction() {
          await dispatch("getOrdersNew", flagObject = {
            isFromAutoCallingApi: true,
            isRemovedFinishOrders: flagObject.isRemovedFinishOrders
          });
        }
        // setInterval(async () => {
        //   await dispatch("getOrdersNew", true);
        // }, selectedReloadInterval);
      }
    }
  },
  async getOrdersNew(
    { commit, state, dispatch, rootState },
    flagObject = {
      isFromAutoCallingApi: false,
      isRemovedFinishOrders: false
    }
  ) {
    let settingData = (await this.$idb.get("settingData")) || [];
    let leadTime = settingData.selectedTimeInterval || "5";
    let selectedHistoryDurationInterval =
      settingData.selectedHistoryDurationInterval || "24";
    let selectedOrderHistoryClearTime =
      settingData.selectedOrderHistoryClearTime || "10:00";
    commit("setLeadTime", leadTime);
    // commit("setOrdersFromIndexedDb", ordersFromIndexedDb);

    let ordersFromIndexedDb = await this.$idb.get("allorders");
    if (flagObject.isRemovedFinishOrders && ordersFromIndexedDb) {
      ordersFromIndexedDb = await dispatch("removeFinishedOrdersForClearing", {
        ordersFromIndexedDb: ordersFromIndexedDb,
        selectedHistoryDurationInterval: selectedHistoryDurationInterval,
        selectedOrderHistoryClearTime: selectedOrderHistoryClearTime
      });
      flagObject.isRemovedFinishOrders = false;
    }

    commit("setOrdersFromIndexedDb", ordersFromIndexedDb);

    const { isLoggedIn, user } = rootState;
    // console.log(`USER`, { isLoggedIn, user });
    // 16a4dea0-b542-4f21-a9e9-7d4b2410c292
    let userProfile = await this.$axios.$get(
      `http://localhost:3004/user/${user.id}`
    );

    let clientId = userProfile[0].orderpro_npb_client_id;
    let siteId = userProfile[0].orderpro_npb_site_id;
    let orders;
    if (flagObject.isFromAutoCallingApi) {
      let lastSyncTime = await this.$idb.get("lastSyncTime");
      orders = await this.$axios.$get(
        `http://localhost:3004/client/${clientId}/orders/site/${siteId}/recent/${lastSyncTime}`
      );
      commit("setLastSyncTime", moment().format("YYYY-MM-DD HH:mm:ss"));
    } else {
      orders = await this.$axios.$get(
        `http://localhost:3004/client/${clientId}/site/${siteId}/orders/today`
      );
      commit("setLastSyncTime", moment().format("YYYY-MM-DD HH:mm:ss"));
    }

    commit("setOrdersFromVuexStore", ordersFromIndexedDb || []);
    // orders = await dispatch("removeFinishedOrdersForClearing", {
    //   ordersFromIndexedDb: orders,
    //   selectedHistoryDurationInterval: selectedHistoryDurationInterval,
    //   selectedOrderHistoryClearTime: selectedOrderHistoryClearTime
    // });
    commit("setOrdersData", orders);
    //call method to filter new order
    dispatch("filterNewOrders");
    //move cancel orders to finish
    commit("moveCancelOrdersToFinished");
    commit("calculatePickupTime");
    commit("moveOrdersToInProgress");
    commit("sortNewOrders");
    commit("setTempNewOrders");

    dispatch("filterInProgressOrders");
    // commit("calculatePickupTime");
    commit("sortInProgressOrders");
    // commit("setInProgressOrders");
    commit("setTempInProgressOrders");

    dispatch("filterFinishedOrders");
    commit("sortFinishedOrders");
    // commit("setInProgressOrders");
    commit("setTempFinishedOrders");
    if (!state.isSelectorOrderExecutedFirst) {
      commit("setSelectedOrders");
    }

    return state.allorders;
  },
  filterNewOrders({ state, commit }) {
    const newOrders = state.allorders.filter(order => {
      return order.status === "submitted";
    });
    commit("setNewOrdersData", newOrders);

    // state.newOrders = newOrders;
    // return newOrders;
  },
  filterInProgressOrders({ state, commit }) {
    const inProgressOrders = state.allorders.filter(order => {
      return order.status === "in progress";
    });
    commit("setInProgressOrdersData", inProgressOrders);

    // state.newOrders = newOrders;
    // return newOrders;
  },
  filterFinishedOrders({ state, commit }) {
    const finishedOrders = state.allorders.filter(order => {
      return order.status === "finished";
    });
    commit("setFinishedOrdersData", finishedOrders);
  },
  moveOrdersManually({ state, commit, dispatch }, requestPayLoad) {
    // if (requestPayLoad.nextState == "finished") {
    //   requestPayLoad.order.timeStampForOrders = moment().format();
    //   // commit("setTimeStampForOrders", requestPayLoad.order)
    // }
    commit("saveMovdeOrdersManually", requestPayLoad);
    this.$idb.set("allorders", state.allorders);

    commit("setOrdersFromVuexStore", state.allorders);
    commit("setOrdersFromIndexedDb", state.allorders);

    if (requestPayLoad.nextState == "in progress") {
      dispatch("filterInProgressOrders");
      commit("sortInProgressOrders");
      dispatch("filterFinishedOrders");
      commit("sortFinishedOrders");
    } else if (requestPayLoad.nextState == "finished") {
      dispatch("filterInProgressOrders");
      commit("sortInProgressOrders");
      console.log("before", state.finishedOrders);
      dispatch("filterFinishedOrders");
      commit("sortFinishedOrders");
    }
  },
  removeFinishedOrdersForClearing({}, requestPayLoad) {
    let orders = requestPayLoad.ordersFromIndexedDb;
    let selectedOrderHistoryClearTime =
      requestPayLoad.selectedOrderHistoryClearTime;
    let selectedHistoryDurationInterval =
      requestPayLoad.selectedHistoryDurationInterval;
    let myStringParts = selectedOrderHistoryClearTime.split(":");
    let hourDelta = +myStringParts[0];
    let minuteDelta = +myStringParts[1];

    let historyDurationIntervalHoursStringParts = selectedHistoryDurationInterval.split(
      " "
    );
    let historyDurationIntervalHourDela = +historyDurationIntervalHoursStringParts[0];

    let etObj = moment({ hour: hourDelta, minute: minuteDelta }); //
    let et;
    let st;
    et = etObj.format("YYYY-MM-DD HH:mm:ss");
    let stObj = etObj.subtract({ hours: historyDurationIntervalHourDela });
    st = stObj.format("YYYY-MM-DD HH:mm:ss");

    let pos_fulfilment_time;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status == "finished" || orders[i].status == "cancelled") {
        pos_fulfilment_time = moment(orders[i].pos_fulfilment_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (
          moment(pos_fulfilment_time).isAfter(et) ||
          moment(pos_fulfilment_time).isBetween(st, et)
        ) {
          console.log("true st", st);
          console.log("true et", et);
          console.log("true pos_fulfilment_time", pos_fulfilment_time);
        } else {
          //remove here
          orders[i].status = "cleared";
          console.log("false st", st);
          console.log("false et", et);
          console.log("false pos_fulfilment_time", pos_fulfilment_time);
        }
      }
    }
    return orders;
  }
};
