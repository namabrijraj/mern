const express = require('express')
const path = require('path')
const hbs = require('hbs');
const requests = require("requests")
//const { partials } = require('handlebars');

const app = express();
const staticPath = path.join(__dirname,"../public")
const templatePath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")
//buildin middleware
app.use(express.static(staticPath))

//set engine
app.set("view engine","hbs")
app.set("views",templatePath)
hbs.registerPartials(partialPath);

app.get('/', (req,res) => {
    res.render("index",{
        text : "hello"
    })
});

app.get('/tables', (req,res) => {
    res.render('tables')
})

app.get('/about', (req,res) => {
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=e0d3d42a628d2a14bb22bf9efafe1967`)
    .on('data', (chunk) =>  {
        const objData = JSON.parse(chunk)
        const arrData = [objData]           
        //const orgData = arrData.map((val) => replaceVal(homePage,val) ).join("");
        // console.log(orgData)
        //console.log(arrData)
        res.write(`City name is ${arrData[0].name} and weather is ${arrData[0].main.temp}`);
    })
    .on('end', (err) => {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
    });
});

app.get('*', (req,res) => {
    //res.status(200).send("Contact page");
    res.render("404")
} );

app.listen(8000,'127.0.0.1' , () => {
    console.log("Express Project")
})