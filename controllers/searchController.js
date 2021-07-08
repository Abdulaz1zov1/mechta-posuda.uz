const Product = require('../models/product');

exports.getProductByName = async(req, res) => {
    const {product} = req.body;
    console.log(product);
    const result = await Product.find(
        {
            $or :[
                {"nameUz": { "$regex": product, "$options": "i" }},
                {"nameRu": { "$regex": product, "$options": "i" }}
            ]
        });
    if(result.length === 0) {
        return res.status(404).json({
            messageUz : 'Hecha narsa topilmadi',
            messageRu : 'Ничего не найдено',
            success : false
        })
    }
    return res.status(200).json({products : result,success: true});
}