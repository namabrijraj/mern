const express = require('express');
const routes = new express.Router()
const bcrypt = require('bcrypt')
const User = require('.././model/users')


routes.post('/api/user', async (req,res) => {
    try {
        const userData = await User.findOne({email:req.body.email})
        if(userData){
            res.status(200).send({'message' : 'User already register!' })
        } else {
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
            res.status(201).send({'users':result,'message' : 'User added successfully!' })
        }       
    } catch (error) {
        console.log(error)
        res.status(500).send({'message':'something happend wrong'+error})
    }
})

routes.post('/api/login', async (req,res) => {
    try {
        const userData = await User.findOne({email:req.body.email})
        if(!userData){
            res.status(200).send({'message' : 'User not found!' })
        } else {
            const isMatch = await bcrypt.compare(req.body.password,userData.password);
            if(isMatch){
                const token = await userData.generateToken()
                res.status(201).send({'user':userData,'message':"login sucessfully"})
            } else {
                res.status(200).send({'message':'Invalid Login Detail'})
            }
        }       
    } catch (error) {
        console.log(error)
        res.status(500).send({'message':'something happend wrong'})
    }
})

module.exports = routes