const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Order
let AdvancedCart = new Schema({
  userId: { type: Number },
  ProductId: { type: String },
  ProductQty: { type: Number },
},{
    collection: 'carts'
});

module.exports = mongoose.model('AdvancedCart', AdvancedCart);