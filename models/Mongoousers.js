let mongoose = require('mongoose');
const bcrypt = require('bcrypt');


let userSchema = mongoose.Schema({
    email: {
        type: String,
    },
    address:{
    type:String,
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    ProfileImageUrl: {
        type: String,
    }
    ,
    // awsbucketObjectkey: {
    //     type: String,
    // },

    // isemailverified: {
    //     type: Boolean,
    // },

    status: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    sessionExpiration: {
        type: String,
    },
    jwttoken: {
        type: String,
    },
    lastLogin: {
        type: Date,

    },

}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);




