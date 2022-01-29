const express = require('express');
const CategoryModel = require('../model/category');
const Product = require('../model/product');
const Router = new express.Router();

const multer = require('multer')
const path = require('path')
var storage = multer.diskStorage(
    {
        destination: './public/img/',
        filename: function ( req, file, cb ) {
            console.log(file)
            const fileName = 'cat'+ Date.now() + path.extname(file.originalname)
            cb( null, fileName );
        }
    }
);
const upload = multer({ storage: storage })

Router.get('/products', async (req,res) => {
    const product = await Product.find();
    res.render('products/index',{product})
});

Router.get('/product/add', async (req,res) => {
    const categories = await CategoryModel.find();
    res.render('products/add',{categories})
});

Router.post('/product', upload.single('image'), async (req,res) => {
    try {
        const slug = req.body.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
        const inputData = new Product({
            name : req.body.name,
            sku : req.body.sku,
            cat_id : req.body.cat_id,
            image : req.file.filename,
            slug : slug,
            isActive : req.body.isActive
        });
        const result = await inputData.save();
        if(result){
            req.flash('success', 'Product added successfully!')
            res.render('products/index',{'message' : req.flash()})
        } else {
            req.flash('error', 'Product not save!')
            res.render('products/add',{'message' : req.flash()})
        }
    } catch (error) {
        console.log(error)
        req.flash('error', 'Somthing happend wrong!')
        res.render('products/add',{'message':req.flash()})
    }
    console.log(req.file, req.body)
    res.render('products/add')
});


module.exports = Router