const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/', AuthMiddleware(['admin', 'user']), WishlistController.addProductToWishlist);
router.get('/', AuthMiddleware(['admin', 'user']), WishlistController.getWishlist);
router.delete('/:productId', AuthMiddleware(['admin', 'user']), WishlistController.removeProductFromWishlist);

module.exports = router;
