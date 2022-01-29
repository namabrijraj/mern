const express = require('express');
const routers = new express.Router();
const category = require('../model/category');

routers.get('/api/categories', async (req,res) => {
    try {
        const categoryData = await category.find();
        // console.log("data "+categoryData);
        res.status(201).send({'categories':categoryData,'message' : 'Categories Data!' })
    } catch (error) {
        res.status(500).send({'message' : 'Somthing happend wrong!' })
    }
});


module.exports = routers