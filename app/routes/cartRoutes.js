const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/', AuthMiddleware(['admin', 'user']), CartController.getCartItems);
router.post('/', AuthMiddleware(['admin', 'user']), CartController.addToCart);
router.put('/:id', AuthMiddleware(['admin', 'user']), CartController.updateCartItem);
router.delete('/:id', AuthMiddleware(['admin', 'user']), CartController.deleteCartItem);

module.exports = router;
