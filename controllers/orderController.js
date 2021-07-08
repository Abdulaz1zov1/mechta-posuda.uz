const Order = require('../models/order');
const Product=require('../models/product')
const User=require('../models/user')
exports.addOrder =  async (req, res) => {
    const data = req.body;
    const param=req.body.productId
    let arr=[];
    let totalN=0;
    let totalP=0;

    const products=data.products;
    for(let i=0; i<products.length; i++){
        let id=products[i].productId;
    const prod=await Product.findById({_id:id})
        totalN= totalN+products[i].productNum;
        totalP=totalP+(products[i].productNum*prod.price)
        arr.push({
            productId:products[i].productId,
            productNum:products[i].productNum,
            price:prod.price
        });
    }

    try {
        const newOrder = new Order({
            phone: data.phone,
            adress: data.adress,
            totalPrice: totalP,
            totalNum: totalN,
            products: arr,
            status : data.status,
            userId:req.headers.userId,
            date: Date.now()
        });



        newOrder.save()
            .then(
                ()=> res.status(200).json({
                    message: 'ok',
                    data: newOrder
                }))
            .catch(
                (err) => res.send(err)
            )

    } catch (error) {
        console.log(error);
    }
};


exports.getByNewOrder = async (req, res)=> {
    try{
        const orders = await Order.find(status === "noactive")
            .sort({date: -1})
        res.status(200).json(orders)
    }catch (e){
        res.status(500).json(e)
    }
}

exports.getAllOrders = async (req,res) => {
    try{
        const orders = await Order
            .find()
            .populate(['products.productId','products.categoryId'])
            .sort({date: -1})
        res.status(200).json(orders)
    } catch (e) {
        res.status(500).json(e)
    }
};



exports.updateOrder = async(req, res,next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);

        order.status = 'active';

        const updatedOrder = await order.save();
        return res.status(200).json({
            success : true,
            order : updatedOrder
        })
    } catch (error) {
        console.log(error);
        next(error);
    }

};

exports.getStatus = async (req, res)=> {
    let sum=0;
    try{
        const orders = await Order.find(/*status === "noactiv"*/)
        for(let i=0; i<orders.length; i++){
            if(orders[i].status === "active"){
                sum++;
            }
        }
        res.status(200).json(sum)

    }catch (e){
        res.status(500).json(e)
    }
}

exports.deleteOrder = async (req,res,next) => {
    Order.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.json({message: "Этот был удален"});
        } else {
            console.log("Error" + err);
        }
    });
}