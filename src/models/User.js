const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const UserSchema = new mongoose.Schema({
    userId: String,
    name: String,
    chatArr: [Chat],
});

const User= mongoose.model('user',UserSchema);
module.exports = User;