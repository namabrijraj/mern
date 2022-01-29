const mongoose = require('mongoose');
const validator = require('validator')

const categorySchema = new mongoose.Schema({
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
    isActive : {
        type : Boolean,
        default : true
    },
    image : {
        type : String
    },
    products : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    created : {
        type : Date,
        default : Date.now
    },
    updated : Date
})

const CategoryModel = new mongoose.model('Categories',categorySchema)

module.exports = CategoryModel