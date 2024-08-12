const express = require('express');
 const Router = express.Router();
 const orderController = require('../controllers/orderController');
 const auth=require('../middlewares/auth');
 Router.post('/post',auth,orderController.manageOrder);
Router.get('/getorders',auth,orderController.getOrders);


 module.exports = Router;