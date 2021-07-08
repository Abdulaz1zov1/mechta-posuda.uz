exports.testAuth = (req,res,next) => {
    console.log('testAuth');
    console.log(req.user);
}