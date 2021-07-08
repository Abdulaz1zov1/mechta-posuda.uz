const mongoose=require('mongoose')

const commentSchema=mongoose.Schema({
    name:{type:String, required:true},
    phone:{type:String, required:true},
    comment:{type:String, required:true},
    status:{type:Boolean, default: false},
    product:{
        type: mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    date:{type:Date, default:Date.now()}
})

module.exports=mongoose.model('Comment', commentSchema)