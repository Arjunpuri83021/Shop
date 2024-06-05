const mongoose=require('mongoose')


const mongoSchema=mongoose.Schema({
    pimg:String,
    titel:String,
    desc:String,
    price:Number
})

module.exports = mongoose.model('product',mongoSchema)

