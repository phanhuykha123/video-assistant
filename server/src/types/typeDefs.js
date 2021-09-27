const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Content {
    content: [Node]
  }

  type Node {
    name: String
    text: String
    thumb: String
    price: String
    buttons: [Button]
    condition:[Condition]
    regex: String
    type: String
    videoUrl: String
    videoTitle: String
  }

  type Button {
    text: String
    event: String
    data: String
  }

  type Condition {
    property: String
    value: String
    operator: String
  }

  type Chat {
    name: String
    text: String
    isBotReply: Boolean
    isShowItem: Boolean
    isShowList: Boolean
    regex: String
    buttons: [Button]
    condition: [Condition]
  }
  type User{
    userId:String
    name:String,
    chatArr: [Chat]
  }


  input ButtonInput {
    text: String
    event: String
    thumb: String
    data: String
  }

  input ConditionInput {
    property: String
    lang: String
    operator: String
  }

  input NodeInput {
    name: String
    ui: String
    text: String
    thumb: String
    price: String
    buttons: [ButtonInput]
    condition:[ConditionInput]
    regex: String
    type: String
    videoUrl: String
    videoTitle: String
  }

  input CurrentNode {
    currentNode : ButtonInput
  }

  input ContentInput {
    content: [NodeInput]
  }

  input ChatInput{
    name: String
    text: String
    isBotReply: Boolean
    isShowItem: Boolean
    isShowList: Boolean
    regex: String
    buttons: [ButtonInput]
    condition: [ConditionInput]
  }

  input chatArrInput {
    chatArr: [ChatInput]
  }

  type Query {
    getContentById(id: ID): Content
    getAll: [Content]
    getHistory(userId: String): User
  }

  type Mutation {
    createContent(idContent: String, dto: NodeInput): Content
    updateContent(idContent: String ,updatedNode: NodeInput): Content
    deleteContent(idContent: String,name:String): Content
    storeHistory(userId: String, chatArr:chatArrInput): User
    navigateNode(idContent: String,currentNode: CurrentNode): Node
  }
`;

module.exports = typeDefs;
