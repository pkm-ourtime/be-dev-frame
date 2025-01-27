const Cart = require('../models/Cart');

class CartController {
    static async addToCart(req, res) {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        try {
            const newCartItem = new Cart({
                product: productId,
                quantity: quantity,
                user: userId,
            });

            await newCartItem.save();
            res.status(201).json(newCartItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getCartItems(req, res) {
        const userId = req.user.id;

        try {
            const cartItems = await Cart.find({ user: userId }).populate('product');
            res.json(cartItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateCartItem(req, res) {
        const cartItemId = req.params.id;
        const { quantity } = req.body;

        try {
            const cartItem = await Cart.findOne({ _id: cartItemId });
            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            cartItem.quantity = quantity;
            await cartItem.save();

            res.json(cartItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCartItem(req, res) {
        const cartItemId = req.params.id;

        try {
            const deletedCartItem = await Cart.findOneAndDelete({ _id: cartItemId });
            if (!deletedCartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            res.json({ message: 'Cart item deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CartController;
