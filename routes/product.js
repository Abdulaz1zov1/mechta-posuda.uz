
const router = require('express').Router()
const md5 = require('md5')
const multer = require('multer');
const {addProduct,
    getById,
    getProduct,
    updateProduct,
    deleteFilePoster} = require('../controllers/productController');
const path = require('path')

//const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');


const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/products/org');
    },
    filename: function (req,file,cb) {
        //cb(null, `${Date.now()}-${file.originalname}`);
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});


const upload = multer({storage: storage});

router.post('/product', upload.array('images',12), addProduct);
router.get('/product', getProduct);
router.get('/product/:id', getById);
router.delete('/product/:id',deleteFilePoster);
router.patch('/product/:id',updateProduct);
module.exports = router;