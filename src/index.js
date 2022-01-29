require('dotenv').config()
const express = require('express')
require("./db/conn")
const cookieParse = require('cookie-parser')
const routers = require("./routes/users")
const categoryrouters = require("./routes/categories")
const productsrouters = require("./routes/products")
const apirouters = require("./API/user")
const apiproductrouters = require("./API/product")
const path = require('path')
const hbs = require('hbs')
const cors = require('cors');
var session = require('express-session');
var flash = require('connect-flash');
var Handlebars = require('handlebars');
 
//Handlebars.registerHelper('ternary', require('handlebars-helper-ternary'));

const app = express();
const port = process.env.port || 8000
const public_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")

//console.log(public_path)
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors())

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
app.use(flash())    
app.use(function(req, res, next) {

//to allow cross domain requests to send cookie information.
res.header('Access-Control-Allow-Credentials', true);

// origin can not be '*' when crendentials are enabled. so need to set it to the request origin
res.header('Access-Control-Allow-Origin',  req.headers.origin);

// list of methods that are supported by the server
res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');

res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    next();
});

app.use(cookieParse())
app.use(express.static(public_path))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routers)
app.use(categoryrouters)
app.use(productsrouters)
app.use(apirouters)
app.use(apiproductrouters)
app.set("view engine","hbs")
app.set("views",template_path)
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/img',express.static('public/images'));
hbs.registerPartials(partial_path)
//Handlebars.registerHelper('ternary', require('handlebars-helper-ternary'));
app.listen(port, () => {
    console.log(`server on ${port}`)
})