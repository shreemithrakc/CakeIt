const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user_id:{
        type:String,
        require:true,

    },
    id:{
        type:String,
        require:true,
    },
    
    user_email:{
        type:String,
    },
    cust_name:{
        type:String,
        required:true
    },
    cust_phno:{
        type:Number,
        required:true
    },
    cust_address:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now,
        
    },
    estDate:{
        type:Date,
        
    },
    tot_Amount:{
        type:Number,

    },
    orderStatus:{
        type:String,

    },
    products:[{
        product_id:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }]


});
const orderModel = mongoose.model('order',orderSchema);
module.exports=orderModel;