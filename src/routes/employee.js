const employee = require("../../DB/model/employees")
const express = require("express")
const router = new express.Router()

router.post("/employee", async (req,res) => {
    try {
        const reqdata = new employee(req.body)
        const data = await reqdata.save()
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
})

router.get("/employee", async (req,res) => {
    try {
        const data = await employee.find()
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
})

router.get("/employee/:id", async (req,res) => {
    try {
        const _id = req.params.id
        const data = await employee.findById(_id)
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
})

router.patch("/employee/:id", async (req,res) => {
    try {
        const _id = req.params.id
        const data = await employee.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
})

router.delete("/employee/:id", async (req,res) => {
    try {
        const _id = req.params.id
        const data = await employee.findByIdAndDelete(_id)
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
})

module.exports = router