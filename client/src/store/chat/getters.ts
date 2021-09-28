import { ChatState, Node, UserState } from '@/interfaces/chatState.interface';

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
	userState(state: ChatState): UserState {
		return state.userState;
	},
	productInfo(state: ChatState): UserState {
		return state.productInfo;
	},
	productList(state: ChatState): UserState {
		return state.productList;
	},
};
