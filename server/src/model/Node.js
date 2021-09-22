const mongoose = require('mongoose');
const Button = require('./Button');

const NodeSchema = new mongoose.Schema({
    name :{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    } ,
    url:{
        type:String,
        require:true,
    },
    buttons:[Button]
});

// const Node = mongoose.model('node',NodeSchema);
module.exports = NodeSchema;