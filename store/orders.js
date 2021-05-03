export const state = () => ({
  allorders: []
});

export const mutations = {
  addOrders(state, orders) {
    //Todo: add if new orders are coming only
    state.allorders = orders;
    this.$idb.set("allorders", orders);
  },
  setOrdersFromIndexedDb(state, orders) {
    //Todo: add if new orders are coming only
    state.allorders = orders;
  }
};

export const actions = {
  async getOrders({ commit }) {
    let ordersFromIndexedDb = await this.$idb.get("allorders");
    if (ordersFromIndexedDb) {
      commit("setOrdersFromIndexedDb", ordersFromIndexedDb);
      return ordersFromIndexedDb;
    } else {
      const orders = await this.$axios.$get("http://localhost:3004/orders");
      commit("addOrders", orders);
      return orders;
    }
  },
};
