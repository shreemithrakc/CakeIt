const WishlistController = require('../controllers/wishlistController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post("/", auth, WishlistController.addToWishlist);
router.get("/", auth, WishlistController.getWishlist);
router.delete("/delete/:id", auth, WishlistController.deleteFromWishlist);

module.exports = router;
