const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/', AuthMiddleware(['admin', 'user']), ReviewController.createReview);
router.get('/product/:productId', ReviewController.getReviewsByProduct);
router.put('/:id', AuthMiddleware(['admin', 'user']), ReviewController.updateReview);
router.delete('/:id', AuthMiddleware(['admin', 'user']), ReviewController.deleteReview);

module.exports = router;
