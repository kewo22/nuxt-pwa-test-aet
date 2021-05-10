export const state = () => ({
  token: "",
  user: {},
  isLoggedIn: false
});

export const getters = {};

export const actions = {
  async authorizeClientApp({ commit }) {
    const grant_type = `grant_type=client_credentials`;
    var authorizationBasic =
      "Basic " +
      window.btoa(
        "staging_order_pro_api" +
          ":" +
          "0B3F2FC6-5C04-49D3-97E8-B088A0F7987A1541CD8E-1884-412B-828C-85B221FA6180"
      );

    const res = await this.$axios.post(
      "https://api-l10-idp-staging-neu.azurewebsites.net/connect/token",
      grant_type,
      {
        headers: {
          Authorization: authorizationBasic
        }
      }
    );
    console.log(res);
    commit("setToken", res.data.access_token);
  },
  setUser({ commit }, user) {
    if (Object.keys(user)) {
      this.$idb.set("user", user);
      commit("setUser", user);
      commit("setLoggedIn", true);
    } else {
      this.$idb.set("user", {});
      commit("setUser", {});
      commit("setLoggedIn", false);
    }
  },
  async getUsersForIndexedDb({ commit }) {
    let userData = (await this.$idb.get("user")) || {};
    if (Object.keys(userData)) {
      commit("setUser", userData);
      commit("setLoggedIn", true);
    } else {
      commit("setUser", {});
      commit("setLoggedIn", false);
    }
  }
};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  }
};
