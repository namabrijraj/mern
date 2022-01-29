const express = require('express')
const async = require('hbs/lib/async')
const Router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const path = require('path')
const CategoryModel = require('../model/category')
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

Router.get('/categories', async(req,res) => { 
    const categories = await CategoryModel.find();
    console.log(categories)
    res.render('categories/index',{'all_categories':categories})
})

Router.get('/category/add', async(req,res) => { 
    res.render('categories/add')
})

Router.post('/category', upload.single('image') , async(req,res) => { 
    try {
        const slug = req.body.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
        const inputData = new CategoryModel({
            name : req.body.name,
            image : req.file.filename,
            slug : slug,
            isActive : req.body.isActive
        });
        const result = await inputData.save();
        if(result){
            req.flash('success', 'Category added successfully!')
            res.render('categories/index',{'message' : req.flash()})
        } else {
            req.flash('error', 'Category not save!')
            res.render('categories/add',{'message' : req.flash()})
        }
    } catch (error) {
        console.log(error)
        req.flash('error', 'Somthing happend wrong!')
        res.render('categories/add',{'message':req.flash()})
    }
    console.log(req.file, req.body)
})


module.exports = Router