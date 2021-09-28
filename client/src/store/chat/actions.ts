// import { CaptureData } from './actions';
import { createNewUser, getNode } from '@/api/chat';
import { Commit, Dispatch, Getter } from 'vuex';

export interface InputNode {
	currentNode: InputField;
}

export interface CaptureData {
	key: string;
	value: string;
	next: string;
}

export interface InputField {
	type: string;
	event: string;
	data: CaptureData | string;
	command: string | undefined;
	name: string;
}

export default {
	async getNode(
		{ commit, getters }: { commit: Commit; getters: any },
		payload: any,
	): Promise<void> {
		if (payload.data.key === 'language_select') {
			commit('SET_USER_LANG', payload.data.value);
		}
		const res = await getNode({
			currentNode: {
				...payload,
			},
		});

		if (res.status === 200) {
			if (res.data.data.ui === 'modal') {
				commit('SET_PRODUCT', res.data.data);
			} else if (res.data.data.ui === 'carousel') {
				commit('SET_LIST_PRODUCTS', res.data.data);
			} else {
				commit('SET_NODE', { ...res.data, nodeId: `id${new Date().getTime().toString()}` });
			}
			commit('SET_TIME_OUT', 1000);
			commit('SET_LOADING', false);
		}
	},

	async register(
		{ commit, getters, dispatch }: { commit: Commit; getters: any; dispatch: Dispatch },
		payload: string,
	) {
		commit('SET_USER_NAME', payload);
		const user = getters.userState;

		const res = await createNewUser({ user });
		console.log(res.data);

		if (res.status === 200) {
			commit('SET_NODE', { ...res.data, nodeId: `id${new Date().getTime().toString()}` });
			commit('SET_TIME_OUT', 1000);
			commit('SET_LOADING', false);
		}
	},
};
