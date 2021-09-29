const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Content {
    content: [Node]
  }

  type Node {
    name: String,
    ui: String,
    type: String,
    videoTitle:String,
    videoUrl:String,
    text: String,
    description: String,
    thumb: String,
    price: String,
    sub_text: String,
    buttons: [Button],
    condition:[Condition],
    regex: String,
  }

  type Button {
    text: String
    event: String
    data: String
    thumb: String,
    price: String,
    sub_text: String,
    description : String
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
    data: String
    thumb: String,
    price: String,
    sub_text: String,
    description : String
  }

  input ConditionInput {
    property: String
    lang: String
    operator: String
  }

  input NodeInput {
    name: String,
    ui: String,
    type: String,
    videoTitle:String,
    videoUrl:String,
    text: String,
    description: String,
    thumb: String,
    price: String,
    sub_text: String,
    buttons: [ButtonInput],
    condition:[ConditionInput],
    regex: String,
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
