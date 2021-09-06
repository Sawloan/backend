const mongoose = require('mongoose');

const ClientAccount = mongoose.model('ClientAccount',{
    fullname: {
        type: String,
    
    },

    username: {
        type: String,
        required : true,
        unique: true
    },

    email: {
        type: String,
        required : true,
        unique: true
    },

    phone: {
        type: String,
        required : true,
        unique: true
    },

    password: {
        type: String
    },

    Usertype: {
        type: String,
        enum: ['Admin','Customer'],
        default:"Customer"
    },
    Image:{
        type:String,
        delault:"No-Image.jpg"
    }

})
module.exports = ClientAccount
