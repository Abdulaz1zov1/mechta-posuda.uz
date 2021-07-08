const router = require('express').Router()
const orderController = require('../controllers/orderController')

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/orders',orderController.addOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/new-orders', orderController.getByNewOrder);
router.put('/order/:id',orderController.updateOrder);
router.delete('/order/:id',orderController.deleteOrder);
router.get('/orders/status', orderController.getStatus)
module.exports = router;
