const mongoose = require('mongoose');

const ButtonSchema = new mongoose.Schema({
    text:{
        type:String,
        require:true,
    },
    event:{
        type:String,
    },
    data:{
        type:String,
    },
    name: String,
    thumb: String,
    price: String,
    sub_text: String,
});

const Button = mongoose.model('button',ButtonSchema);
module.exports = ButtonSchema;