const mongoose = require('mongoose');
const Button = require('./Button');
const Condition = require('./Condition');

const NodeSchema = new mongoose.Schema({
  name: String,
  text: String,
  thumb: String,
  price: String,
  sub_text: String,
  buttons: [Button],
  condition:[Condition],
  regex: String,
});

const Node = mongoose.model('node', NodeSchema);
module.exports = NodeSchema;
