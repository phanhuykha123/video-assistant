const mongoose = require('mongoose');
const Node = require('../models/Node');
const ContentSchema = new mongoose.Schema({
    content:[Node],
});

const Content= mongoose.model('content',ContentSchema);
module.exports = Content;