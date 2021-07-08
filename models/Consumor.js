const mongoose=require('mongoose')

const  consumorSchema=mongoose.Schema({
    phone:{type:String, required:true},
    region:Number,
    name:String,
    nextOrderId : Number,
    isAdmin:{type:Boolean, default: false},
    product:{
        type: mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    date:{type:Date, default:Date.now()},

    orders : [{orderId : {type :mongoose.Schema.ObjectId, ref: 'order'}}]
})

module.exports=mongoose.model('Consumor', consumorSchema)