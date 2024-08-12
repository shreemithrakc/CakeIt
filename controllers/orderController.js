const Order = require("../models/OrderModel");
const Cart = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');

// Manage Order Function
const manageOrder = async (req, res) => {
//     const { cust_name, cust_phno, cust_address } = req.body;
//     try {
//         const { user_id, user_email } = req.user;
// console.log({user_email})
//         const userCart = await Cart.findOne({ user_id });
//         if (!userCart) {
//             return res.status(400).json({ message: "Cart is empty" });
//         }

//         const productDetails = [];

//         for (const item of userCart.products) {
//             const product = await ProductModel.findOne({ id: item.product_id });
//             if (product) {
//                 productDetails.push({
//                     product_id: item.product_id,
//                     quantity: item.quantity
//                 });
//             }
//         }

//         const newOrder = new Order({
//             id: uuidv4(),
//             user_id,
//             user_email, 
//             cust_name, 
//             cust_phno,
//             cust_address,
//             products: productDetails,
//             orderDate: new Date(), // order date
//             estDate: new Date(Date.now() + 7*24*60*60*1000) // Estimated delivery date (1 week later)
//         });

//         const savedOrder = await newOrder.save();
//         await userCart.deleteOne({ userId });

//         return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error", error: err.message });
//     }
const {cust_name, cust_phno, cust_address} = req.body;
    try{
        const {userId}=req.user;
        const {user_email}=req.user;

        const userCart=await Cart.findOne({userId});
       
        if(!userCart){
            return res.status(400).json({message:"cart is empty"});
        }
       
        const newOrder = new Order({
            id:uuidv4(),
            userId,
            user_email, 
            cust_name, 
            cust_phno,
            cust_address,
            products: Cart.product,
            orderDate:new Date()
        });
        console.log(newOrder)
        const savedOrder = await newOrder.save();

        
        await userCart.deleteOne({ userId });
        return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });

    }
    catch(err){
        res.status(404).json({message:"internal server error",err})
    }

};

// Get Orders Function
const getOrders = async (req, res) => {
    const userId = req.user.id; 
    try {
        const orderDetails = await Order.find({ userId });
        const allProducts = [];

        for (const order of orderDetails) {
            for (const product of order.products) {
                const productDetails = await ProductModel.findOne({ id: product.product_id });
                if (productDetails) {
                    allProducts.push({
                        productId: product.product_id,
                        quantity: product.quantity,
                        delDate: order.estDate,
                        title: productDetails.title, 
                        price: productDetails.price, 
                        image: productDetails.image
                    });
                } else {
                    console.error("Product not found", product.product_id);
                }
            }
        }

        return res.status(200).json({ orders: orderDetails, products: allProducts });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports = { manageOrder, getOrders };