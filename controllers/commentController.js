const Comment = require('../models/comment')

exports.addComment = (req,res) => {
    const comment = new Comment({
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment,
        product: req.body.product
    })
    comment.save()
        .then( () => res.status(200).json({message: 200}))
        .catch((e) => console.log(e))
}
exports.getAllComments = async (req,res) => {
    const comments = await Comment
        .find()
        .populate('product')
        .sort({date: -1})
    res.send(comments)
}
exports.getAllNoActiveComments = async (req,res) => {
    try{
        const comments = await Comment
            .find({status: false})
            .populate('product')
            .sort({date: -1})
        res.send(comments)
    } catch (e){
        res.send(e)
    }
}
exports.getCommentByProduct = async (req,res) => {
    try{
        const comments = await Comment
            .find({product: req.headers.id, status: true})
            .populate('product')
            .sort({date: -1})

        res.status(200).json(comments)
    } catch (e) {
        res.send(e)
    }
}
exports.updateCommentById = async (req,res) => {
    const comment = await Comment.findById({_id: req.body.id})
    comment.status = true
    const updatedProduct = await comment.save();
    return res.status(200).json({
        success : true,
        product : updatedProduct
    })
}
exports.deleteCommentById = async (req,res) => {
    Comment.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.json({message: "Этот был удален"});
        } else {
            console.log("Error" + err);
        }
    });
}
