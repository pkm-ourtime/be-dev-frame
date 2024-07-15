const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/', AuthMiddleware, CartController.getCartItems);
router.post('/', AuthMiddleware, CartController.addToCart);
router.put('/:id', AuthMiddleware, CartController.updateCartItem);
router.delete('/:id', AuthMiddleware, CartController.deleteCartItem);

module.exports = router;
