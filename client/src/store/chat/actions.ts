import { getNode } from '@/api/chat';
import { Commit } from 'vuex';

export interface InputNode {
  currentNode: InputField;
}

export interface InputField {
  type: string;
  event: string;
  data: string;
  command: string | undefined;
}

export default {
  async getNode({ commit }: { commit: Commit }, payload: InputNode): Promise<void> {
    console.log(payload);

    const res = await getNode(payload);

    if (res.status === 200) {
      commit('SET_NODE', res.data);
      commit('SET_TIME_OUT', 1000);
      commit('SET_LOADING', false);
    }
  },
};
