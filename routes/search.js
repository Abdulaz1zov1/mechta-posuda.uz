const express= require('express')
const router=express.Router()
const searchController=require('../controllers/searchController')
const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/search' ,searchController.getProductByName);

module.exports=router;