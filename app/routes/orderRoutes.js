const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/', AuthMiddleware(['admin', 'user']), OrderController.getOrder);
router.post('/', AuthMiddleware(['admin', 'user']), OrderController.createOrder);
router.put('/:id', AuthMiddleware(['admin', 'user']), OrderController.updateOrderStatus);
router.delete('/:id', AuthMiddleware(['admin', 'user']), OrderController.deleteOrder);

module.exports = router;