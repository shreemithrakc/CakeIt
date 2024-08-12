const ProductController =require('../controllers/productController')
const express=require('express');
const router=express.Router();
const auth=require('../middlewares/auth');

router.get("/",auth,ProductController.getProducts)
router.post("/",auth,ProductController.createProduct)
// router.get('/products',()=>{

// })

module.exports=router