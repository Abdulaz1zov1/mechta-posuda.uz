const express = require('express');
const router = express.Router();
const reginController = require('../controllers/regionController')

router.post('/region', reginController.addregion);
module.exports = router;