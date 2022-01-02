const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
    employee_name:{
        type : String,
        require : true,
        lowercase : true,
        trim:true
    },
    employee_salary:{
        type:Number
    },
    employee_age:{
        type :Number,
        minlength : 18,
        maxlength :50
    },
    profile_image: String
})

const Employees = new mongoose.model("Employee",employeesSchema)

module.exports = Employees