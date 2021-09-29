// import { CaptureData } from './actions';
import { createNewUser, getNode, orderItem } from '@/api/chat';
import { UserState } from '@/interfaces/chatState.interface';
import { Commit, Dispatch, Getter } from 'vuex';

export interface InputNode {
  currentNode: InputField;
}

export interface InputField {
  type: string;
  event: string;
  data: string;
  command: string | undefined;
  name: string;
}

export default {
  async orderItem(
    { commit, getters }: { commit: Commit; getters: any },
    payload: any
  ): Promise<void> {
    const { name, language } = getters.userState;
    const res = await orderItem({
      name,
      language,
      address: payload.address,
      phone: payload.phone,
    });
    if (res.status === 200) {
      commit('SET_NODE', { ...res.data, nodeId: `id${new Date().getTime().toString()}` });
      commit('SET_TIME_OUT', 1000);
      commit('SET_LOADING', false);
    }
  },
  async getNode({ commit }: { commit: Commit }, payload: InputField): Promise<void> {
    const res = await getNode({
      currentNode: {
        ...payload,
      },
    });

    if (res.status === 200) {
      if (res.data.data.name === 'conversation_start') {
        commit('SET_NODE', { ...res.data, nodeId: `id${new Date().getTime().toString()}` });
      } else if (res.data.data.ui === 'modal') {
        commit('SET_PRODUCT', res.data.data);
      } else if (res.data.data.ui === 'carousel') {
        commit('SET_LIST_PRODUCTS', res.data.data);
      } else {
        commit('SET_NEXT_NODE', { ...res.data, nodeId: `id${new Date().getTime().toString()}` });
      }

      commit('SET_TIME_OUT', 1000);
      commit('SET_LOADING', false);
    }
  },

  async register({ commit }: { commit: Commit }, payload: UserState) {
    try {
      commit('SET_USER_STATE', payload);
      const res = await createNewUser({ user: payload });
      if (res.status === 200) {
        commit('SET_NODE', { ...res.data, nodeId: `id${new Date().getTime().toString()}` });
        commit('SET_TIME_OUT', 1000);
        commit('SET_LOADING', false);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
