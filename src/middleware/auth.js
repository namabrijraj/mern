const jwt = require('jsonwebtoken')
const user = require('../model/users')

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        const userdata = await user.findOne({_id:verifyToken._id})

        req.user = userdata
        req.token = token
        console.log(userdata)
        next()
    } catch (error) {
        res.render('login')
    }
}

module.exports = auth