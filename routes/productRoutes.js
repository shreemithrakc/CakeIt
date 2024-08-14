const ProductController =require('../controllers/productController')
const express=require('express');
const router=express.Router();
const auth=require('../middlewares/auth');
//auth
router.get("/",ProductController.getProducts)
router.post("/",ProductController.createProduct)
// router.get('/products',()=>{

// })

module.exports=router