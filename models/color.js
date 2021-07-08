const mongoose=require('mongoose')

const colorSchema=mongoose.Schema({
    url:{type:String, required:true},
    name:String,
    date:{type:Date, default:Date.now()}
})
module.exports=mongoose.model('Color', colorSchema)