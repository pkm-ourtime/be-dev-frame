const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/', AuthMiddleware, OrderController.getOrder);
router.post('/', AuthMiddleware, OrderController.createOrder);
router.put('/:id', AuthMiddleware, OrderController.updateOrderStatus);
router.delete('/:id', AuthMiddleware, OrderController.deleteOrder);

module.exports = router;