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
    LOGIN: (state, auth) => {
      state.auth = auth;
    },
    LOGOUT: (state) => {
      state.auth = null;
    },
    THEMEDARK: (state) => {
      state.conf.theme_dark = !state.conf.theme_dark;
    },
    PROFILE: (state, item) => {
      state.auth.user = item;
    },
  },
  actions: {
    loginAction: (context, auth) => {
      context.commit("LOGIN", auth);
    },
    logoutAction: (context) => {
      context.commit("LOGOUT");
    },
    themeDarkAction: (context) => {
      context.commit("THEMEDARK");
    },
    profileAction: (context, item) => {
      context.commit("PROFILE", item);
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
