

 const Region=require('../models/Region')

 exports.addregion=(req,res)=>{
    const regions=new Region({
        region:req.body.region
    })
     regions.save()
         .then(()=>{
             res.status(201).json({
                 success:true,
                 data:regions
             })
         })
         .catch((e)=>{
             res.status(500).json({
                 success:false,
                 e
             })
         })
 }