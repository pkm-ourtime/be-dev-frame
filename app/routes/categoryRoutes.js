const express = require('express');
const CategoryController = require('../controllers/categoryController');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', AuthMiddleware('admin'), CategoryController.createCategory);
router.put('/:id', AuthMiddleware('admin'), CategoryController.updateCategory);
router.delete('/:id', AuthMiddleware('admin'), CategoryController.deleteCategory);

module.exports = router;