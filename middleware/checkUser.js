function eA(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
}


function eAdmin(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            next();
        }
        else{
            res.redirect('/commerce/show');
        }
    }else{
        req.flash('danger','Iltimos ro`yxatdan o`ting');
        res.redirect('/logout');
    }
}
function eOperator(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == 'operator'){
            next();
        }
        else{
            res.redirect('/logout');
        }
    }else{
        res.redirect('/logout');
    }
}
function eBoth(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == 'admin' || req.user.role == 'admin'){
            next();
        }
        else{
            res.redirect('/logout');
        }
    }else{
        res.redirect('/logout');
    }
}
module.exports.eA = eA;
module.exports.eAdmin = eAdmin;
module.exports.eOperator = eOperator;
module.exports.eBoth = eBoth;
