const Content = require('../models/Content');
const User = require('../models/User');
const { UserInputError, InternalServerError } = require('apollo-server');

const resolvers = {
  Query: {
    getContentById: async (_parent, { id }, _context, _info) => {
      const result = await Content.findById(id);
      return result;
    },
    getAll: async () => {
      const result = await Content.find();
      return result;
    },
    getHistory: async (parent, { userId }, context, info) => {
      const user = await User.findOne({ userId });
      if (!user) {
        throw new UserInputError('User Not exist');
      }
      return user;
    },
  },
  Mutation: {
    createContent: async (parent, { idContent, dto }, context, info) => {
      console.log(idContent);
      const data = await Content.findById(idContent);
      const isExistName = data.content.filter((item) => item.name === dto.name);
      if (isExistName.length) {
        return new UserInputError('Name is exist');
      }
      await Content.updateMany({ idContent }, { $push: { content: { ...dto } } });
      return Content.findById(idContent);
    },

    updateContent: async (parent, { idContent, updatedNode }, context, info) => {
      console.log(idContent, updatedNode);

      const record = await Content.findById(idContent);
      let isExistName = false;
      let arrContent = [];
      record.content.map(async (node) => {
        if (node.name === updatedNode.name) {
          isExistName = true;
          node = { ...updatedNode };
          console.log('node', node);
          arrContent.push(node);
        } else {
          arrContent.push(node);
        }
      });
      console.log(arrContent);
      if (isExistName === false) {
        throw new UserInputError('Name of node must be unique!!!');
      }
      return Content.findByIdAndUpdate(idContent, { content: arrContent }, { new: true });
    },

    deleteContent: async (parent, { idContent, name }, context, info) => {
      const record = await Content.findOne({ idContent });
      const updatedContent = record.content.filter((item) => item.name !== name);
      await Content.updateMany({ id: idContent }, { content: updatedContent });
      return Content.findOne({ idContent });
    },

    storeHistory: async (parent, { userId, chatArr }, context, info) => {
      const user = await User.findOneAndUpdate({ userId }, { ...chatArr });
      if (!user) {
        throw new UserInputError('User Not exist');
      }
      return user;
    },
    navigateNode: async (parent,{idContent,currentNode}, context, info) => {
      const data = await Content.findById(idContent);
      const oldNode  = currentNode.currentNode;
      let matchNode,temp=false;
      if(oldNode.event === 'capture'){
        oldNode.data= JSON.parse(oldNode.data.replace(/'/g, '"'));
      }
      data.content.map(item => {
        const nameNextNode = oldNode.event === 'capture' ? oldNode.data.next : oldNode.data;
        if(item.name === nameNextNode){
          if(oldNode.event === 'goto') {
            matchNode = item
            return matchNode;
          };
          data.content.map(node => {
            const condition = node.condition;
            condition.map(cond => {
              if(cond.property === oldNode.data.key){
                temp = true;
              }
            })
          })
          if(temp)  matchNode = item;
        }
      })
      return matchNode;
    }
  },
};

module.exports = resolvers;
