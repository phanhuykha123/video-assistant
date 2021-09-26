const Node = require('../model/Node');
const Content = require('../model/Content');

class NodeController {
  async storage(req, res) {
    const { name, title, url, buttons } = req.body;
    console.log({ title, url, buttons });
    try {
      const content = await Content.findByIdAndUpdate(process.env.ID, {
        content: {
          $push: {
            name,
            title,
            url,
            buttons,
          },
        },
      });
      return res.status(200).json({ message: 'saved success' });
    } catch (e) {
      return res.status(503).json(e);
    }
  }

  async navigateNode(req, res) {
    
    const nextNode = req.body.data;
    const contentArray = await Content.findById(process.env.ID);
    try {
      contentArray.content.forEach((node) => {
        // console.log(node.name);
        if (node.name === nextNode) {
          console.log(node);
          return res.status(200).json(node);
        }
      });
    } catch (e) {
      return res.status(503).json(e);
    }
  }
}

module.exports = new NodeController();
