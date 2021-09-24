const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
    property:{
        type:String,
    } ,
    value:{
        type:String,
    },
    operator:{
        type:String,
    },
});

const Condition = mongoose.model('condition',ConditionSchema);
module.exports = ConditionSchema;