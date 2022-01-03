const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        require : true,
        lowercase : true,
        minlength : 3
    },
    lastname : {
        type : String,
        require : true,
        lowercase : true,
        minlength : 3
    },
    email : {
        type : String,
        require : true,
        unique : true,
        lowercase : true,
        minlength : 3,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    password : {
        type : String,
        require : true
    },
    address : {
        type : String,
        maxlength : 300
    },
    mobile : {
        type : Number,
        require : true,
        minlength:6,
        maxlength:10
    },
    tokens : [{
        token : {
            type : String,
            require : true
        }
    }] 
})

userSchema.methods.generateToken = async function () {
    const _id = this._id
    const tokenVal =  await jwt.sign({_id},process.env.SECRET_KEY,{ expiresIn:'2h' });
    this.tokens = this.tokens.concat({token:tokenVal})
    await this.save()
    return tokenVal
}


const User = new mongoose.model("User",userSchema)

module.exports = User