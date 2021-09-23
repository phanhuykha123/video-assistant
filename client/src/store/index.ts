import Vue from 'vue';
import Vuex from 'vuex';
// import request from '@/utils/request';
import { getNode } from '@/api/chat';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    node: { Object },
    timeout: 1000,
  },
  mutations: {
    SET_NODE(state, payload) {
      state.node = payload;
    },
    SET_TIME_OUT(state, payload) {
      state.timeout = payload;
    },
  },
  actions: {
    async getNode({ commit }, payload) {
      const res = await getNode(payload);
      if (res.status === 200) {
        commit('SET_NODE', res.data);
        commit('SET_TIME_OUT', 1000);
      }
    },
  },
  getters: {
    node(state) {
      return state.node;
    },
    timeout(state) {
      return state.timeout;
    },
  },
  modules: {},
});
