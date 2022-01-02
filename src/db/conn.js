const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
.then( () => console.log("Connetec to DB"))
.catch( (err) => console.log(err) )