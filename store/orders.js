export const state = () => ({
  allorders: [],
  ordersFromIndexedDb: []
});

export const mutations = {
  setOrdersData(state, orders) {
    if (state.allorders && state.allorders.length != 0) {
      let i = 0;
      state.allorders.forEach(item => {
        if (item.status == "in progress" && item.cancelled) {
          item.isInProgressCancelled = true;
        }
        if (item.status != "new") {
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
  }
};

export const getters = {
  getAllOrders: state => {
    return state.allorders;
  }
};

export const actions = {
  async getOrdersNew({ commit }) {
    let ordersFromIndexedDb = await this.$idb.get("allorders");
    commit("setOrdersFromIndexedDb", ordersFromIndexedDb);
    var orders = await this.$axios.$get("http://localhost:3004/orders");
    commit("setOrdersFromVuexStore", ordersFromIndexedDb);

    commit("setOrdersData", orders);
    return state.allorders;
  }
};
