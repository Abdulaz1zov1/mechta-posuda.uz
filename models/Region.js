

const mongoose=require('mongoose')
const RegionSchema=mongoose.Schema({
    region:{type:String, required:true}
})

module.exports=mongoose.model('Region', RegionSchema)
