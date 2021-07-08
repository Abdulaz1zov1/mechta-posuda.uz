
const Category=require('../models/category')
const Color=require('../models/color')
const Product=require('../models/product')

exports.addCategory=(req,res)=>{
    if(!req.body.nameUz){
        res.json("name required");
    }
    const category=new Category({
        nameUz:req.body.nameUz,
        nameRu:req.body.nameRu,
        cat_Slug:Date.now(),
        date:Date.now()
    })
    category.save()
        .then(()=>{
            res.status(200).json({
                success:true,
                message: "Ушпешно добавления"
            })
        })
        .catch((e)=>{
            res.status(500).json({
                success:false,
                e
            })
        })
}

exports.getALLCategory=async (req,res)=>{
    const category=await Category.find()
        .sort({date:-1})
    res.send(category)
}


exports.updateCategory = async(req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id)
    category.nameUz = req.body.nameUz
    category.nameRu = req.body.nameRu
    category.save()
        .then(()=>{
            res.status(200).json({
                success : true,
                product : category
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success : false,
                err
            })
        })
}

exports.deleteCategory=async (req,res)=>{
    await Category.findByIdAndDelete(req.params.id, (err,doc)=>{
        if(!err){
            res.json({message: "Этот категория был удален"});
        }else{
            console.log("error"+err)
        }
    })
}

exports.addColor= (req,res)=>{
    const color=new Color({
            name: req.body.name,
            url : req.body.url,
            date: Date.now()
    })
    color.save()
        .then(()=>{
            res.status(200).json({
                message: "Ушпешно добавления"
            })
        })
}

exports.getColors = async (req,res) => {
    let colors = await Color.find().sort({date: -1});
    res.send(colors);
}

exports.deleteColor=async (req,res)=>{
    await Color.findByIdAndDelete(req.params.id, (err,doc)=>{
        if(!err){
            res.json({message: "Этот цвет был удален"});
        }else {
            res.json({ error : err })
            console.log("Error" + err);
        }
    })
}

exports.getById=async (req,res)=>{
    const getProduct=Product.findById({category: req.params.id})
        .sort({date:-1})
    res.send(getProduct)
}