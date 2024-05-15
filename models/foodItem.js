let mongoose = require('mongoose');
let foodSchema = mongoose.Schema({
    title: {
        type: String,
    },
    Ingredients: {
        type: String,
    },
    Description: {
        type: String,
    },
    itemImageUrl: {
        type: String,
    },
    itemPrice: {
        type: Number
    },
    // awsbucketObjectkey: {
    //     type: String,
    // },

    // isemailverified: {
    //     type: Boolean,
    // },

    status: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });
module.exports = mongoose.model('foodItems', foodSchema);