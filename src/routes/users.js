const express = require('express')
const routes = new express.Router()
const User = require('../model/users')
const bcrypt = require('bcrypt') 
const auth = require('../middleware/auth')

routes.get('/', auth, async (req,res) => {
    res.render('dashboard')
})

routes.get('/login', async (req,res) => {
    res.status(201).render('login')
})

routes.get('/users', async (req,res) => {
    const users = await User.find();
    res.status(201).render('users/index',{all_users:users})
})

routes.get('/user/:id', async (req,res) => {
    const result = await User.findById(req.params.id);
    res.status(201).render('users/show',{user:result})
})

routes.get('/user/add', async (req,res) => {
    res.status(201).render('users/add')
})

routes.post('/user', auth,async (req,res) => {
    try {
        const hasPwd = await bcrypt.hash(req.body.password,10)
        
        const userParam = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hasPwd,
            mobile: req.body.mobile,
            address: req.body.address
        })
        const token = await userParam.generateToken()
        userParam.tokens = userParam.tokens.concat({token:token})
        const result = await userParam.save()
        console.log(result)
        res.status(201).render('users')
    } catch (error) {
        console.log(error)
        res.status(500).render('users/add')
    }
})

routes.get('/logout', auth, async (req,res) => {
    res.clearCookie('jwt')
    req.user.tokens = req.user.tokens.filter((currentElm) => {
        return currentElm.token != req.token
    })
    await req.user.save()
    res.redirect('login')
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