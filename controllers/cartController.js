const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Get Cart Items
exports.getcart = async (req, res) => {
    const { user_id } = req.user;

    try {
        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }

        let subTotal = 0;
        const CartItems = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Product.findOne({ id: product.product_id });
                subTotal += productDetails.price * product.quantity;
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                    quantity: product.quantity,
                };
            })
        );

        return res.status(200).json({ cartItem: CartItems, subTotal });
    } catch (err) {
        console.error("Error in getcart:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete a Product from Cart
exports.deleteCart = async (req, res) => {
    const { user_id } = req.user;
    const product_id = req.params.id;

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ message: "User not found" });
        }

        const IsProduct = cart.products.find((product) => product.product_id === product_id);

        if (!IsProduct) {
            return res.status(401).json({ message: "Product not found" });
        }

        if (cart.products.length <= 1) {
            await Cart.deleteOne({ user_id });
            return res.status(200).json({ message: "Product deleted from cart" });
        } else {
            cart.products = cart.products.filter((pr) => pr.product_id !== product_id);
            await cart.save();
            return res.status(200).json({ message: "Product deleted from cart" });
        }
    } catch (err) {
        console.error("Error in deleteCart:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Create or Update Cart
exports.createCart = async (req, res) => {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({
                user_id,
                products: [{ product_id, quantity }],
            });
        } else {
            const ProductIndex = cart.products.findIndex((prod) => prod.product_id === product_id);

            if (ProductIndex > -1) {
                cart.products[ProductIndex].quantity = quantity;
            } else {
                cart.products.push({ product_id, quantity });
            }
        }

        await cart.save();
        return res.status(200).json({ message: "Product updated/added in cart", cart });
    } catch (err) {
        console.error("Error in createCart:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//
//
// const Cart=require ("../models/cartModel");/* only id we are storing*/

// const Product=require ("../models/productModel");

// exports.getcart = async (req, res) => {
//     const {user_id}=req.user;

//     const cart=await Cart.findOne({user_id});

//     if(!cart){
//         res.status(400).json({message:"Cart not found"});
//     }try{
//         let subTotal=0;
//         const CartItems=await Promise.all(
//             cart.products.map(async (product)=>{
//                 const productDetails=await Product.findOne({id:product.product_id});
//                 subTotal+=productDetails.price*product.quantity;
//                 return{
//                 product_id:productDetails.id,
//                 title:productDetails.title,
//                 description:productDetails.description,
//                 price:productDetails.price,
//                 image:productDetails.image,
//                 quantity:product.quantity,
                
//                 };
//             })
//         );
//         res.status(200).json({cartItem:CartItems,subTotal});
//     }catch(err){
//  res.status(500).json({message:"Server error",err});
//     }
    
// };

// exports.deleteCart=async(req,res)=>{
//     const {userId}=req.user;
//     const product_id=req.params.id
//     try{
// let cart=await Cart.findOne({userId});
// if(!cart){
//     return res.status(404).json({message:"user not found"})
// }
// const IsProduct = cart.products.find((product)=>product.product_id === product_id);
// if(!IsProduct){
//     return res.json(401).json({message: "Product not found"})
// }else{
// if(cart.products.length<=1){
//     await Cart.deleteOne({
//         userId
//     })
//     return res.status(200).json({message:"Product deleted from cart"});
// }
// else{
//     cart.products=cart.products.filter((pr)=>
//         prod.id!=product_id
//     )
//     cart.save()
//     return res.status(200).json({message:"Product deleted from cart"});
// }
// }
//     }
//     catch(err){
//         return res.status(401).json({message:"internal server error",err})
//     }
// };
 

  
// exports.createCart=async (req,res)=>{
//     const {user_id}=req.user;
//     const {product_id,quantity}=req.body;
//     let cart=await Cart.findOne({user_id});/checking cart data/

//  if(!cart){
//     cart=new Cart({
//     user_id,
//     products:[
//         {
//             product_id,
//             quantity,
//         },
//     ],
    
//     });
//  }else{
//     const ProductIndex=cart.products.findIndex(
//         (prod)=>prod.product_id===product_id
//     );


// if(ProductIndex > -1){/* quantity is increased*/
//     cart.products[ProductIndex].quantity=quantity;
//  }else{
//     cart.products.push({product_id,quantity});/else we are pushing/
//  }
// }
// cart.save();
// res.status(200).json({message:"Product updated/added in cart",cart});
// };

// const Cart=require ("../models/cartModel");/* only id we are storing*/

// const Product=require ("../models/productModel");

// exports.getcart = async (req, res) => {
//     const {user_id}=req.user;

//     const cart=await Cart.findOne({user_id});

//     if(!cart){
//         res.status(400).json({message:"Cart not found"});
//     }try{
//         let subTotal=0;
//         const CartItems=await Promise.all(
//             cart.products.map(async (product)=>{
//                 const productDetails=await Product.findOne({id:product.product_id});
//                 subTotal+=productDetails.price*product.quantity;
//                 return{
//                 product_id:productDetails.id,
//                 title:productDetails.title,
//                 description:productDetails.description,
//                 price:productDetails.price,
//                 image:productDetails.image,
//                 quantity:product.quantity,
                
//                 };
//             })
//         );
//         res.status(200).json({cartItem:CartItems,subTotal});
//     }catch(err){
//  res.status(500).json({message:"Server error",err});
//     }
    
// };

// exports.deleteCart=async(req,res)=>{
//     const {userId}=req.user;
//     const product_id=req.params.id
//     try{
// let cart=await Cart.findOne({userId});
// if(!cart){
//     return res.status(404).json({message:"user not found"})
// }
// const cartIndex = cart.products.findIndex((product)=>product.product_id === product_id);

// if(cart.products.length<=1){
//     await Cart.deleteOne({
//         userId
//     })
//     return res.status(200).json({message:"Product deleted from cart"});
// }
// else{
//     cart.products=cart.products.filter((pr)=>
//         prod.id!=product_id
//     )
//     cart.save()
//     return res.status(200).json({message:"Product deleted from cart"});
// }
// }
//     catch(err){
//         return res.status(401).json({message:"internal server error",err})
//     }
// };
 

  
// exports.createCart=async (req,res)=>{
//     const {user_id}=req.user;
//     const {product_id,quantity}=req.body;
//     let cart=await Cart.findOne({user_id});/*checking cart data*/

//  if(!cart){
//     cart=new Cart({
//     user_id,
//     products:[
//         {
//             product_id,
//             quantity,
//         },
//     ],
    
//     });
//  }else{
//     const ProductIndex=cart.products.findIndex(/*if inside it will give positive number*/
//         (prod)=>prod.product_id===product_id
//     );


// if(ProductIndex > -1){/* quantity is increased*/
//     cart.products[ProductIndex].quantity=quantity;
//  }else{
//     cart.products.push({product_id,quantity});/*else we are pushing*/
//  }
// }
// cart.save();
// res.status(200).json({message:"Product updated/added in cart",cart});
// };