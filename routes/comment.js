const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');

router.post('/comment',commentController.addComment)
router.get('/comments',commentController.getAllNoActiveComments)
router.get('/allcomments',commentController.getAllComments)
router.get('/comment',commentController.getCommentByProduct)
router.patch('/comment',commentController.updateCommentById)
router.delete('/comment/:id',commentController.deleteCommentById)
module.exports = router
