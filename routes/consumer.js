const express= require('express')
const router=express.Router()
const consumerController=require('../controllers/consumorController')

router.post('/add' ,consumerController.addConsumer);

module.exports=router;