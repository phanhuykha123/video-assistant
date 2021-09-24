interface State {
  chatbotData: [];
  editNode: any;
}

export default {
  getChatbotData(state: State) {
    return state.chatbotData;
  },
  getEditNode(state: State) {
    return state.editNode;
  }
};
