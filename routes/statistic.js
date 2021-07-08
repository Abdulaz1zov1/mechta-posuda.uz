const router = require('express').Router()
const statisticsController = require('../controllers/statististicsController');
const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.get('/getstats', statisticsController.getStatistics);
// router.get('/order/:orderId',orderController.getByRegion);
router.post('/getmonthstats', statisticsController.getByMonth)
module.exports = router;