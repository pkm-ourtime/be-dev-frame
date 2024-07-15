const Order = require('../models/Order');
const Cart = require('../models/Cart');

class OrderController {
  static async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const cartItems = await Cart.find({ user: userId }).populate('product');

      if (!cartItems.length) {
        return res.status(400).json({ message: 'No items in cart' });
      }

      const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);

      const newOrder = new Order({
        user: userId,
        items: cartItems.map(item => item._id),
        totalAmount,
        status: 'pending',
      });

      await newOrder.save();

      await Cart.deleteMany({ user: userId });

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
