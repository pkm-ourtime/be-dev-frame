const Wishlist = require('../models/Wishlist');

class WishlistController {
  static async addProductToWishlist(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      let wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        wishlist = new Wishlist({ user: userId, products: [productId] });
      } else {
        if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
        }
      }

      await wishlist.save();

      res.status(201).json(wishlist);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getWishlist(req, res) {
    try {
      const userId = req.user.id;

      const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeProductFromWishlist(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params.productId;

      const wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }

      wishlist.products = wishlist.products.filter(p => p.toString() !== productId);

      await wishlist.save();

      res.json(wishlist);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = WishlistController;
