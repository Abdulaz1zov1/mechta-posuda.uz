const Order = require('../models/order');
const Category = require('../models/category');
const Product = require('../models/product')
const Comment = require('../models/comment')
const interval = 1000 * 60 * 60 * 24; // milliseconds in one day

exports.getStatistics = async (req, res) => {
    const orderByRegion = await Order
        .aggregate().group({_id : '$region', orderNums: { $sum: 1 }});
    // 24 hours in milliseconds
    const startOfDay = new Date(Math.floor(Date.now() / interval) * interval);
  //  console.log("SAna ",startOfDay)
    const dayOfWeek = startOfDay.getDay();
    const dayOfMonth = startOfDay.getDate();
     console.log('startOfDay', startOfDay);
 


    const startOfWeek = new Date(Math.floor(startOfDay.getTime() - dayOfWeek * interval));
    const startOfMonth = new Date(Math.floor(startOfDay.getTime() - dayOfMonth * interval));
    const last30Days = new Date(Math.floor(startOfDay.getTime() - 30 * interval));



    const ordersToday = await Order.find({ date : {"$gte" : startOfDay}}).countDocuments();
    const ordersWeek = await Order.find({date : {"$gte" : startOfWeek}}).countDocuments();
    const orderMonth = await Order.find({date : {"$gte" : startOfMonth}}).countDocuments();
    const ordersLast30Days = await Order.find({date : {"$gte" : last30Days}}).countDocuments();
    // console.log(ordersToday);
    const allProduct = await Product.find().countDocuments()
    const allOrders = await Order.find().countDocuments()
    const sellOrders = await Order.find({status: "active"}).countDocuments()
    const allComments = await Comment.find().countDocuments()
    res.status(200).json({
        allComments,
        allOrders,
        sellOrders,
        allProduct,
        orderByRegion,
        ordersToday ,
        ordersWeek,
        orderMonth,
        ordersLast30Days
    });
}

exports.getByMonth = async (req, res) => {
    const {month,year} = req.body;// 6 ,2020
    // console.log(month , year);

    const beginning  = new Date(year, month-1, 1, 0, 0, 0, 0);
    const ending = new Date(year, month);

    const orders = await Order.find({date : {"$lte" : ending , "$gte" : beginning}}).countDocuments();
    //console.log(orders);
    res.status(200).json({orders})

}
