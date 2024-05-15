let mongoose = require('mongoose');
let orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'foodItems',
        required: true
    },
    title:{
      type:String
    },
    price: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });
module.exports = mongoose.model('foodorder', orderSchema);