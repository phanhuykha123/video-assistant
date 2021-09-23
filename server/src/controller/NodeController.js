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
    const contentArray = await Content.findById('614b422eed70ffcee0601892');
    try {
      contentArray.content.forEach(node => {
        if (node.name === nextNode) {
          return res.status(200).json({
            data: node,
          });
        }
      });
    } catch (e) {
      return res.status(503).json(e);
    }
  }
}

module.exports = new NodeController();
