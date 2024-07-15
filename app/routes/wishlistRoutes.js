const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/', AuthMiddleware, WishlistController.addProductToWishlist);
router.get('/', AuthMiddleware, WishlistController.getWishlist);
router.delete('/', AuthMiddleware, WishlistController.removeProductFromWishlist);

module.exports = router;
