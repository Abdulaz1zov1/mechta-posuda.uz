const File = require('../models/files');

exports.upload = (req,res, next)=> {

    const file = new File({
        path: req.file.path,
        date: Date.now()
    })
    file
        .save()
        .then(result => {
            res.status(200).json({
                message: "Uploaded"
            })
        })
}

exports.getFile = async (req,res,next) => {
    let files = await File.find().sort({date: -1});
    res.send(files);
}