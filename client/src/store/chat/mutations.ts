import { ChatState, Node, UserState } from '@/interfaces/chatState.interface';

export default {
  SET_NODE(state: ChatState, payload: Node): void {
    state.node = payload;
  },
  SET_TIME_OUT(state: ChatState, payload: number): void {
    state.timeout = payload;
  },
  SET_AUTO_PLAY(state: ChatState, payload: boolean): void {
    state.autoplay = payload;
  },
  SET_LOADING(state: ChatState, payload: boolean): void {
    state.isLoading = payload;
  },
  SET_USER_STATE(state: ChatState, payload: UserState): void {
    state.userState = payload;
  },

  SET_PRODUCT(state: ChatState, payload: any): void {
    state.productInfo = payload;
  },
  SET_LIST_PRODUCTS(state: ChatState, payload: any): void {
    state.productList = payload;
  },
};
