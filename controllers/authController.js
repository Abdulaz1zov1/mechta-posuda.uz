const User = require('../models/user');
const config = require ('../config/server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async  ( req, res )=>{
    let userData = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);
    let user = new User({
        name: userData.name,
        email: userData.email,
        password: password,
        regionId:req.body.regionId,
        date: Date.now()
    });

    user.save((error, registedUser)=>{
        if(error){
            throw error
        }else{
            let payload = {subject: registedUser._id};
            let token = jwt.sign(payload, config.secret);
            res.status(200).send({token});
        }
    })
};

exports.login = async (req,res) => {
    const candidate = await User.findOne({email: req.body.email})
    //agar foydalauvchi bazada mavjud bo`lsa
    if(candidate){
        //parolni heshdan tekshirish
        const passwordResult = bcrypt.compareSync(req.body.password , candidate.password)
        //agar parol to`g`ri kelsa
        if(passwordResult){
            //token generatsiya qilish
            const token = jwt.sign({
                email: candidate.email
            },config.secret)
            res.status(200).json({
                token: token
            })
        } else {
            //parol xato bo`lsa
            res.status(401).json({
                message: "invalid password"
            })
        }
    } else {
        //agar admin topilmasa
        res.status(404).json({message: "public not found"})
    }
};

exports.getAll=async (req,res)=>{
    const users=await User.find()
    res.status(200).json(users)
}