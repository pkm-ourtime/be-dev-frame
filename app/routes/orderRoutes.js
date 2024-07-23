const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/', AuthMiddleware(['admin', 'user']), OrderController.getOrder);
router.post('/', AuthMiddleware(['admin', 'user']), OrderController.checkoutFromCart);
router.post('/buynow', AuthMiddleware(['admin', 'user']), OrderController.buyNow);
router.put('/:id', AuthMiddleware(['admin']), OrderController.updateOrderStatus);
router.delete('/:id', AuthMiddleware(['admin']), OrderController.deleteOrder);

module.exports = router;