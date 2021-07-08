const mongoose=require('mongoose')
const Product=require('../models/product')
const orderSchema=mongoose.Schema({
    phone:{type:String, required:true},
    adress:{type:String, required:true},
    totalPrice:{type:Number, required:true},
    totalNum:{type:Number, required:true},
    products:[
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            color: {
                type: mongoose.Schema.ObjectId,
                ref : 'colors'
            },
            productNum: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        default: "noactive"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    date:{type:Date, default:Date.now()}
})
module.exports = mongoose.model('order', orderSchema);
