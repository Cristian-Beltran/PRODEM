// store/index.js
import Vuex from "vuex";
import Cookies from "js-cookie";
import { verifyTokenRequest } from "../api/auth.js";

export const store = new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ISAUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    async verifyToken({ commit }) {
      const cookies = Cookies.get();
      if (!cookies.token) {
        commit("SET_USER", null);
        commit("SET_ISAUTHENTICATED", false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res.data);
        if (!res.data) {
          commit("SET_USER", null);
          commit("SET_ISAUTHENTICATED", false);
          return;
        }
        commit("SET_USER", res.data);
        commit("SET_ISAUTHENTICATED", true);
      } catch (error) {
        commit("SET_USER", null);
        commit("SET_ISAUTHENTICATED", false);
      }
    },
  },
  getters: {
    dataUser(state) {
      return {
        email: state.user.email,
        username: state.user.username,
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        address: state.user.address,
        telf: state.user.telf,
        cel: state.user.cel,
        ci: state.user.ci,
        birthdate: new Date(state.user.birthdate).toISOString().slice(0, 10),
      };
    },
    fullNameUser(state) {
      return state.user.first_name + " " + state.user.last_name;
    },
    isLogin(state) {
      return state.isAuthenticated;
    },
    type(state) {
      return state.user.type;
    },
  },
  modules: {},
});
