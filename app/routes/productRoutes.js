const express = require('express');
const ProductController = require('../controllers/productController');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', AuthMiddleware('admin'), ProductController.createProduct);
router.put('/:id', AuthMiddleware('admin'), ProductController.updateProduct);
router.delete('/:id', AuthMiddleware('admin'), ProductController.deleteProduct);

module.exports = router;
