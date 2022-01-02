require('dotenv').config()
const express = require('express')
require("./db/conn")
const cookieParse = require('cookie-parser')
const routers = require("./routes/users")
const path = require('path')
const hbs = require('hbs')

const app = express();
const port = process.env.port || 8000
const public_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")
//console.log(public_path)
app.use(cookieParse())
app.use(express.static(public_path))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routers)
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partial_path)

app.listen(port, () => {
    console.log(`server on ${port}`)
})