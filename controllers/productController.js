const Product= require("../models/productModel")
const { v4: uuidv4 } = require('uuid');

exports.getProducts = async(req,res)=>{
    try{
        const products = await Product.find()
        res.send(products)
    }
    catch(err){
        console.log(err);
    }
};

exports.createProduct = async(req,res)=>{
    const{title,price,description,category,image,rating,} = req.body;
    const product = new Product({
        id:uuidv4(),
        title,
        price,
        description,
        category,
        image,
        rating
        
    })
    await product.save();
    res.status(200).json("Product created successfully");
};
