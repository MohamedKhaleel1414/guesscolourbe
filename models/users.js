const mongoose = require('mongoose')

const usersCollection = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    totalpoints:{
        type:Number,
        default:0,
    },
    registrationDate:{
        type:Date,
        default:Date.now()
    },
    generatedCode:{
        type:String,
        default:"null",
    }
},{
    strict:true,
    versionKey:false,
})

module.exports = mongoose.model("usersCollection",usersCollection)