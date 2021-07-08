const Consumer =require('../models/consumor');

exports.addConsumer=(req,res)=>{
    if(!req.body.phone){
        res.json("phone required");
    }
    if(!req.body.region){
        res.json("region required")
    }

    //const {phone,region,name}=req.body;
    const consumer=new Consumer({
        phone:req.body.phone,
        region:req.body.region,
        name:req.body.name,
        date:Date.now()
    });

    consumer.save()
        .then(result=>{
            res.status(200).json({
                message: "Successully added"
            })

        });
}