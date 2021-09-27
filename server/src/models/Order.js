const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
});

const Order= mongoose.model('order',OrderSchema);
module.exports = Order;