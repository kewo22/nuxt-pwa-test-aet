export const state = () => ({
  token: "",
  user: {},
  isLoggedIn: false,
  userProfile: {}
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
  async setUser({ commit, dispatch }, user) {
    if (Object.keys(user).length != 0) {
      this.$idb.set("user", user);
      commit("setUser", user);
      commit("setLoggedIn", true);
      await dispatch("getProfileDetails", { user });
    } else {
      this.$idb.set("allorders", []);
      this.$idb.set("user", {});
      commit("setUser", {});
      commit("setLoggedIn", false);
    }
  },
  async getUsersForIndexedDb({ commit, dispatch }) {
    let userData = (await this.$idb.get("user")) || {};
    if (Object.keys(userData)) {
      commit("setUser", userData);
      commit("setLoggedIn", true);
      await dispatch("getProfileDetails", { user: userData });
    } else {
      commit("setUser", {});
      commit("setLoggedIn", false);
    }
  },
  async getProfileDetails({ commit }, payload) {
    let userProfile = await this.$axios.$get(
      `http://localhost:3004/user/${payload.user.id}`
    );
    commit("setUserProfile", userProfile[0]);
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
  },
  setUserProfile(state, userProfile) {
    state.userProfile = userProfile;
  }
};
