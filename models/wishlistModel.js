const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    user_id: String,
    products: [
        {
            product_id: String,
        },
    ],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
