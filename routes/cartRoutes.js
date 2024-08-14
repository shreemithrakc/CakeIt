const CartController =require('../controllers/cartController')
const express=require('express');
const router=express.Router();
const auth=require('../middlewares/auth');


router.post("/",auth,CartController.createCart)
router.get("/",auth,CartController.getcart)
router.delete("/delete/:id",auth,CartController.deleteCart)

// router.post("/",CartController.createCart)
// router.get("/",CartController.getcart)
// router.delete("/delete/:id",CartController.deleteCart)


module.exports=router


