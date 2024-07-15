const Order = require('../models/Order');

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find().populate('user').populate('items.product');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createOrder(req, res) {
    try {
      const { items } = req.body;
      const userId = req.user.id;

      const newOrder = new Order({
        items: items,
        user: userId,
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId).populate('user').populate('items.product');

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const { items } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { items: items }, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json({ message: 'Order deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = OrderController;
