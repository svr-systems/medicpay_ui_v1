import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    conf: {
      theme_dark: true,
    },
  },
  mutations: {
    LOGIN: (state, data) => {
      state.auth = data;
    },
    LOGOUT: (state) => {
      state.auth = null;
    },
    THEMEDARK: (state) => {
      state.conf.theme_dark = !state.conf.theme_dark;
    },
  },
  actions: {
    loginAction: (context, data) => {
      context.commit("LOGIN", data);
    },
    logoutAction: (context) => {
      context.commit("LOGOUT");
    },
    themeDarkAction: (context) => {
      context.commit("THEMEDARK");
    },
  },
  getters: {
    getAuth: (state) => {
      return state.auth;
    },
    getConf: (state) => {
      return state.conf;
    },
  },
  plugins: [createPersistedState()],
});
