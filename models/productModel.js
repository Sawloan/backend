const mongoose = require('mongoose');

const Product = mongoose.model('product', {
    pName: {type : String},
    pPrice: {type : String},
    pDesc: {type : String},
    pImage: {type : String,default:"N-Image.jpg"},
    pRating: {type : String}
})

module.exports = Product;