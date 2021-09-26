import { getInfo } from '../../../auth/test';

export default {
  async TestFunction({ commit, dispatch }, payload) {
    try {
      const { data } = await getInfo({
        headers: { Authorization: 'Bearer ' + payload }
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
};
