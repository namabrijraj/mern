const express = require('express')
const routes = new express.Router()
const User = require('../model/users')
const bcrypt = require('bcrypt') 
const auth = require('../middleware/auth')

routes.get('/', auth, async (req,res) => {
    res.status(201).render('dashboard')
})

routes.get('/login', async (req,res) => {
    res.status(201).render('login')
})

routes.get('/logout', auth, async (req,res) => {
    res.clearCookie('jwt')
    req.user.tokens = req.user.tokens.filter((currentElm) => {
        return currentElm.token != req.token
    })
    await req.user.save()
    res.render('login')
})

routes.post('/login', async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const data = await User.findOne({email:email})
        const isMatch = await bcrypt.compare(password,data.password);
        if(isMatch){
            const token = await data.generateToken()
            res.cookie('jwt',token,{
                httpOnly : true,
                expires: new Date(Date.now() + 900000)
                //secure : true
            })
            res.status(201).render('dashboard')
        } else {
            res.status(401).send('Invalid Login Detail')
        }
    } catch (error) {
        console.log(error)
        res.status(500).render('login')   
    }
})

module.exports = routes