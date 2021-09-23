import { ChatState, Node } from '@/interfaces/chatState.interface';

export default {
  node(state: ChatState): Node {
    return state.node;
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
};
