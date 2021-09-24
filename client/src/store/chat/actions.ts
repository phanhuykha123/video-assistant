import { getNode } from '@/api/chat';
import { Commit } from 'vuex';

export interface InputNode {
  data: InputField;
}

export interface InputField {
  name: string;
}

export default {
  async getNode({ commit }: { commit: Commit }, payload: InputNode): Promise<void> {
    const res = await getNode(payload);
    if (res.status === 200) {
      commit('SET_NODE', res.data);
      commit('SET_TIME_OUT', 1000);
      commit('SET_LOADING', false);
    }
  },
};
