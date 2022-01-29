const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        lowercase : true,
        trim : true,
        required : true
    },
    slug : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true
    },
    sku : {
        type : String,
        lowercase : true,
        unique : true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    image : {
        type : String
    },
    cat_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Categories'
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Brand'
    },
    created : {
        type : Date,
        default : Date.now
    },
    updated : {
        type : Date
    }
})

const Product = new mongoose.model('Products',productSchema)

module.exports = Product