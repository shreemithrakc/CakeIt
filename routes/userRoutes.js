const UserController =require('../controllers/userController')
const express=require('express');
const router=express.Router();


router.post("/",UserController.createUser)
router.post("/login",UserController.login)
// router.get('/products',()=>{

// })

module.exports=router