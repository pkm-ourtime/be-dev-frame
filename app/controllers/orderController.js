const Order = require('../models/Order');
const Cart = require('../models/Cart');

class OrderController {
  static async checkoutFromCart(req, res) {
    const userId = req.user.id;

    try {
        const cartItems = await Cart.find({ user: userId }).populate('product');

        if (cartItems.length === 0) {
          return res.status(400).json({ message: 'Cart is empty' });
        }

        let totalAmount = 0;
        const orderItems = cartItems.map(item => {
          totalAmount += item.product.price * item.quantity;
          return {
            product: item.product._id,
            quantity: item.quantity,
          };
        });

        const newOrder = new Order({
          user: userId,
          items: orderItems,
          totalAmount: totalAmount,
          status: 'pending',
        });

        await newOrder.save();

        await Cart.deleteMany({ user: userId });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
  }

  static async buyNow(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const totalAmount = product.price * quantity;

      const newOrder = new Order({
        user: userId,
        items: [{
          product: productId,
          quantity: quantity,
        }],
        totalAmount: totalAmount,
        status: 'pending'
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

  static async getOrder(req, res) {
    try {
      const userId = req.user.id;

      const orders = await Order.find({ user: userId }).populate('user').populate({
        path: 'items',
        populate: {
          path: 'product'
        }
      });

      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.status = status;
      order.updatedAt = Date.now();

      await order.save();

      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      await Order.deleteOne({ _id: orderId });

      res.json({ message: 'Order deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = OrderController;
