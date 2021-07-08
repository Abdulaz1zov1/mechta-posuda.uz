const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    pid: {type: Number, required: true},
    nameUz: {type: String, required: true},
    nameRu: {type: String, required: true},
    slug: {type: String, slug: "pid"},
    category: {
        type:mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    size: {type: String, required: true},
    diametr: {type: String, required: true},
    descriptionUz: {type: String,required: true},
    descriptionRu: {type: String,required: true},
    xarakterUz: {type: String, required: true},
    xarakterRu: {type: String, required: true},
    images: [
        {
            url : {
                type: String,
                required: true
            },
            colorId : {
                type : mongoose.Schema.ObjectId,
                ref : 'Color',
                required:true
            }
        }
    ],
    price: {type: Number, required: true},
    date: Date
});

module.exports = mongoose.model('Product', productSchema);
