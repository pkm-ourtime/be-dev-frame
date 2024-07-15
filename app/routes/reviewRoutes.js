const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/', AuthMiddleware, ReviewController.createReview);
router.get('/product/:productId', ReviewController.getReviewsByProduct);
router.put('/:id', AuthMiddleware, ReviewController.updateReview);
router.delete('/:id', AuthMiddleware, ReviewController.deleteReview);

module.exports = router;
