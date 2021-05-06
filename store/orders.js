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
  selectedOrder: null
});

export const mutations = {
  setOrdersData(state, orders) {
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

    this.$idb.set("allorders", state.allorders);
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
  setLeadTime(state, leadTime) {
    state.leadTime = leadTime;
  },
  sortNewOrders(state) {
    state.newOrders.sort(function (a, b) {
      return a.pickupTimeInMinutes - b.pickupTimeInMinutes;
    });
  },
  sortInProgressOrders(state) {
    state.inProgressOrders.sort(function (a, b) {
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
      .sort(function (a, b) {
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
  }
};

export const actions = {
  async getOrdersNew({ commit, state, dispatch, rootState }) {
    let settingData = (await this.$idb.get("settingData")) || [];
    let leadTime = settingData.selectedTimeInterval || "15";

    commit("setLeadTime", leadTime);
    commit("setOrdersFromIndexedDb", ordersFromIndexedDb);

    let ordersFromIndexedDb = await this.$idb.get("allorders");
    commit("setOrdersFromIndexedDb", ordersFromIndexedDb);

    // const { isLoggedIn, user } = rootState;
    // console.log(`USER`, { isLoggedIn, user });

    let clientId = 1;
    let siteId = 2323;
    var orders = await this.$axios.$get(
      `http://localhost:3004/client/${clientId}/site/${siteId}/orders/today`
    );
    commit("setOrdersFromVuexStore", ordersFromIndexedDb);
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
    commit("setSelectedOrders");

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
    if (requestPayLoad.nextState == "finished") {
      requestPayLoad.order.timeStampForOrders = moment().format();
    }
    commit("saveMovdeOrdersManually", requestPayLoad);
    this.$idb.set("allorders", state.allorders);

    commit("setOrdersFromVuexStore", state.allorders);
    commit("setOrdersFromIndexedDb", state.allorders);

    if (requestPayLoad.nextState == "in progress") {
      dispatch("filterInProgressOrders");
      commit("sortInProgressOrders");
      dispatch("filterFinishedOrders");

    } else if (requestPayLoad.nextState == "finished") {
      dispatch("filterInProgressOrders");
      commit("sortInProgressOrders");
      console.log("before", state.finishedOrders);
      dispatch("filterFinishedOrders");
      commit("sortFinishedOrders");

    }

  }
  // async getLeadTime
  // getNewStateOrders() {
  //   console.log("getAllOrders",state.allorders)

  //   return state.allorders;
  // }
};
