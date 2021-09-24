export default {
  SET_CHATBOT_DATA(state: any, payload: any) {
    const clonePayload = JSON.parse(JSON.stringify(payload));

    clonePayload.map((node: any) => {
      node.buttons.forEach((button: any) => {
        if (button.event === 'capture') {
          button.data = JSON.parse(button.data);
          button.nextNodeConditionsData = {
            name: '',
            conditions: []
          };
        }
      });
    });

    state.chatbotData = clonePayload;
  },
  SET_EDIT_NODE(state: any, payload: any) {
    state.editNode = state.chatbotData.find((node: any) => node.name === payload);
  }
};
