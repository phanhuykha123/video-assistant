import Vue from 'vue';
import Vuex from 'vuex';
import chat from './chat';
// import request from '@/utils/request';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
  },
});
