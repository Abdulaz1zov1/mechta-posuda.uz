
const Product = require('../models/product')
const fs = require('fs');
const path = require('path')
const sharp=require('sharp')
exports.addProduct=async (req,res)=>{
    const files = req.files;
    const urls = [];
    for (const file of files){
        const { filename } = file;
        await sharp(path.join(path.dirname(__dirname) + `/public/products/org/${filename}`) ).resize(500,500)
            .jpeg({
                quality: 60
            })
            .toFile(path.join(path.dirname(__dirname) + `/public/products/thumb/${filename}`), (err)=>{
                if(err) {
                    throw err
                }
                fs.unlink(path.join(path.dirname(__dirname) + `/public/products/org/${filename}`)  ,(error)=>{
                    if (error) res.send(error)
                })
            })
        urls.push({
            url:`/public/products/thumb/${filename}`,
            colorId:req.body.colorId
        })
    }
    const product = new Product({
        nameUz: req.body.nameUz,
        nameRu: req.body.nameRu,
        category: req.body.category,
        size: req.body.size,
        diametr: req.body.diametr,
        descriptionUz: req.body.descriptionUz,
        descriptionRu: req.body.descriptionRu,
        xarakterUz: req.body.xarakterUz,
        xarakterRu: req.body.xarakterRu,
        images: urls,
        price: req.body.price,
        pid: Date.now(),
        date: Date.now()
    });
   await product.save()
        .then(() => {
            res.status(200).json({
                success: true,
                data: product
            })
        })
       .catch((error)=> {
           res.send(error)
       })
}
exports.getProduct=async (req,res)=>{
   const product= await Product.find()
        .populate('images.colorId')
        .sort({date:-1})
    res.status(200).json({
        success:true,
        data:product
    })
}

exports.getById=async (req,res)=>{
const getProduct=await Product.findById({_id: req.params.id});
    const categoryId = getProduct.category;
    const similarProducts = await Product
        .find({category  : categoryId});
    res.send({getProduct :getProduct  , similarProducts : similarProducts});
}

exports.updateProduct = async(req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.id)
    product.price = req.body.price
    product.nameUz=req.body.nameUz
    product.nameRu=req.body.nameRu
    product.category= req.body.category
    product.size= req.body.size
    product.diametr= req.body.diametr
    product.descriptionUz=req.body.descriptionUz
    product.descriptionRu= req.body.descriptionRu
    product.xarakterUz= req.body.xarakterUz
    product.xarakterRu= req.body.xarakterRu
    product.save({validateBeforeSave:false})
        .then(()=>{
            res.status(200).json({
                success : true,
                product : product
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success : false,
                err
            })
        })
}

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
        console.log(err);
    });
};


exports.deleteFilePoster = async (req, res) => {
    await Product.findById({_id: req.params.id})
        .exec((error,data) => {
            if(error) {
                res.send(error)
            }
            else{
                const fileess=data.images;
                for(let i = 0; i < fileess.length; i++){

                    let fileOriginal = path.join(path.dirname(__dirname) + `${fileess[i].url}`)
                    fs.unlink(fileOriginal, async (error) => {
                        if (error) {
                            console.log(error)
                        }
                        await Product.findByIdAndDelete({_id: req.params.id})
                    })
                }
            }
        })
}