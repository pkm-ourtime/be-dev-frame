const Review = require('../models/Review');

class ReviewController {
  static async createReview(req, res) {
    try {
      const { product, rating, comment } = req.body;
      const userId = req.user.id;

      const newReview = new Review({
        user: userId,
        product,
        rating,
        comment,
      });

      await newReview.save();

      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getReviewsByProduct(req, res) {
    try {
      const productId = req.params.productId;
      const reviews = await Review.find({ product: productId }).populate('user', 'username');

      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const { rating, comment } = req.body;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      if (review.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      review.rating = rating;
      review.comment = comment;
      review.updatedAt = Date.now();

      await review.save();

      res.json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      const reviewId = req.params.id;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      if (review.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      await review.deleteOne({ _id: reviewId });

      res.json({ message: 'Review deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReviewController;
