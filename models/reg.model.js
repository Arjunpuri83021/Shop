const mongoose=require('mongoose')

const mongoSchema=mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    password:String
})


 module.exports= mongoose.model('/11AmReg',mongoSchema)