const express = require('express');
const ProductController = require('../controllers/productController');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', AuthMiddleware, ProductController.createProduct);
router.put('/:id', AuthMiddleware, ProductController.updateProduct);
router.delete('/:id', AuthMiddleware, ProductController.deleteProduct);

module.exports = router;
