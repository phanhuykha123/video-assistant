const mongoose = require('mongoose');
const Button = require('../models/Button');
const Condition = require('../models/Condition');
const ChatSchema = new mongoose.Schema({
    name: String,
    text: String,
    isBotReply: Boolean,
    isShowItem: Boolean,
    isShowList: Boolean,
    regex: String,
    buttons: [Button],
    condition: [Condition],
});

const Chat= mongoose.model('chat',ChatSchema);
module.exports = ChatSchema;