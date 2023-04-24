const Content = require('../models/Content');
const Order = require('../models/Order');
const User = require('../models/User');
const webhookRouter = require('./webhook');


function route(app) {
  app.post('/navigateNode', async (req, res) => {
    const data = await Content.findById(process.env.ID);
    const oldNode = { ...req.body.currentNode };
    const nameNextNode = oldNode.event === 'capture' ? oldNode.data.next : oldNode.data;
    const node = data.content.find((node) => {
      if (nameNextNode === node.name) return node;
    });

    const newNode = JSON.parse(JSON.stringify(node));
    newNode.buttons = newNode.buttons.map((but) => {
      if (but.event === 'capture') {
        but.data = JSON.parse(but.data);
      }
      return but;
    });

    if (node)
      return res.status(200).json({
        status: 'success',
        data: newNode,
      });
    res.status(404).json({ status: 'failed', message: 'Node Not found' });
  });

  app.post('/user', async (req, res) => {
    try {
      const data = await Content.findById(process.env.ID);
      const { name, language } = req.body.user;
      await User.create({ name, language });
      const nextNode = data.content.find(
        (node) => node.name === `conversation_welcome${language === 'vi' ? ':vi' : ''}`
      );
      res.status(200).json({
        status: 'success',
        data: nextNode,
      });
    } catch (err) {
      res.status(400).json({ status: 'failed', message: err.message });
    }
  });

  app.post('/order', async (req, res) => {
    try {
      //Save order form
      const { name, language, address, phone } = req.body;
      const orderInformation = new Order({ name, address, phone });
      await orderInformation.save();
      //Get Node conversation_end
      const data = await Content.findById(process.env.ID);
      const endConversation = language === 'en' ? 'conversation_end' : 'conversation_end:vi';
      const node = data.content.find((node) => node.name === endConversation);
      res.status(200).json({
        status: 'message',
        data: node,
      });
    } catch (err) {
      console.log(err);
      res.status(503).json({ status: 'failed', message: err.message });
    }
  });

  app.use('webhook',webhookRouter);

}

module.exports = route;
