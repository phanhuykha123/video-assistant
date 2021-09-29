import { ChatState, Node, Product, UserState } from '@/interfaces/chatState.interface';

export default {
  node(state: ChatState): Node {
    return state.node;
  },
  nextNode(state: ChatState): Node {
    return state.nextNode;
  },
  timeout(state: ChatState): number {
    return state.timeout;
  },
  autoplay(state: ChatState): boolean {
    return state.autoplay;
  },
  isLoading(state: ChatState): boolean {
    return state.isLoading;
  },
  userState(state: ChatState): UserState {
    return state.userState;
  },
  productInfo(state: ChatState): Product {
    return state.productInfo;
  },
  productList(state: ChatState): UserState {
    return state.productList;
  },
};
