const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

// Get Wishlist Items
exports.getWishlist = async (req, res) => {
    const { user_id } = req.user;

    try {
        const wishlist = await Wishlist.findOne({ user_id });

        if (!wishlist) {
            return res.status(400).json({ message: "Wishlist not found" });
        }

        const wishlistItems = await Promise.all(
            wishlist.products.map(async (product) => {
                const productDetails = await Product.findOne({ id: product.product_id });
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                };
            })
        );

        return res.status(200).json({ wishlistItems });
    } catch (err) {
        console.error("Error in getWishlist:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add/Update Wishlist
exports.addToWishlist = async (req, res) => {
    const { user_id } = req.user;
    const { product_id } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ user_id });

        if (!wishlist) {
            wishlist = new Wishlist({
                user_id,
                products: [{ product_id }],
            });
        } else {
            const isProductInWishlist = wishlist.products.find((prod) => prod.product_id === product_id);

            if (!isProductInWishlist) {
                wishlist.products.push({ product_id });
            }
        }

        await wishlist.save();
        return res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (err) {
        console.error("Error in addToWishlist:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Delete Product from Wishlist
exports.deleteFromWishlist = async (req, res) => {
    const { user_id } = req.user;
    const product_id = req.params.id;

    try {
        let wishlist = await Wishlist.findOne({ user_id });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const isProductInWishlist = wishlist.products.find((product) => product.product_id === product_id);

        if (!isProductInWishlist) {
            return res.status(401).json({ message: "Product not found in wishlist" });
        }

        wishlist.products = wishlist.products.filter((pr) => pr.product_id !== product_id);
        await wishlist.save();

        return res.status(200).json({ message: "Product deleted from wishlist" });
    } catch (err) {
        console.error("Error in deleteFromWishlist:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
