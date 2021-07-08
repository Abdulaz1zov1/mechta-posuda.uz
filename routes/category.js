const router = require('express').Router()
const multer = require('multer');
const {eA,eAdmin,eOperator,eBoth} = require('../middleware/checkUser');
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        // console.log(file);
        cb(null, '.public/colors');
    },
    filename: function (req,file,cb) {
        // console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

const {addCategory,
    getALLCategory,
    deleteCategory,
    getColors,
    addColor,
    updateCategory,
    deleteColor,
    getById }=require('../controllers/categoryController')

router.post('/category', addCategory)
router.get('/category', getALLCategory)
router.post('/color', upload.single('color'), addColor);
router.get('/colorall', getColors)
router.delete('/category/:id', deleteCategory)
router.delete('/category/:id', deleteColor)
router.patch('/category/:categoryId', updateCategory)
router.get('/category/:id', getById)
module.exports=router