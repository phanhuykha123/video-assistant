function covertButtondata(chatNodes) {
  let chatNodesClone = JSON.parse(JSON.stringify(chatNodes));
  chatNodesClone.content = chatNodesClone.content.map((node) => {
    node.buttons.map((button) => {
      if (button.event === 'capture') {
        button.data = JSON.parse(JSON.stringify(button.data));
        return button;
      }
      return button;
    });
    return node;
  });
  return chatNodesClone;
}
module.exports = covertButtondata;
