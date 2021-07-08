

const mongoose=require('mongoose')

const fileSchema=mongoose.Schema({
    name:{type:String, required:true},
    date:{type:Date, default:Date.now()}
})

module.exports=mongoose.model('File', fileSchema)