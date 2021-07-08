const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    nameUz:{type:String, required:true},
    nameRu:{type:String, required:true},
    cat_Slug:{type:String, required:true},
    Slug:{type:String, slug:'cat_Slug'},
    date:{type:Date, default:Date.now()}
})

module.exports=mongoose.model('Category', categorySchema)