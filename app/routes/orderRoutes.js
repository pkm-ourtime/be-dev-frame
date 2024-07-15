const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/', AuthMiddleware, OrderController.getAllOrders);
router.post('/', AuthMiddleware, OrderController.createOrder);
router.get('/:id', AuthMiddleware, OrderController.getOrderById);
router.put('/:id', AuthMiddleware, OrderController.updateOrder);
router.delete(':id', AuthMiddleware, OrderController.deleteOrder);

module.exports = router;