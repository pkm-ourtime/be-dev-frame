const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderController {
    static async getAllOrders(req, res) {
        try {
            const userId = req.user.id;

            const orders = await Order.find({ user: userId }).populate('user').populate('items.product');
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createOrder(req, res) {
        try {
            const { items } = req.body;
            const userId = req.user.id;

            const products = await Promise.all(
                items.map(async item => {
                    const product = await Product.findById(item.product);
                    if (!product) {
                        throw new Error(`Product with ID ${item.product} not found`)
                    }
                    return {
                        ...item,
                        price: product.price
                    }
                })
            );

            const totalAmount = products.reduce((total, item) => {
                return total + item.price * item.quantity
            }, 0);

            const newOrder = new Order({
                user: userId,
                items: products,
                totalAmount: totalAmount
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
            res.status(500).json({ message: error.message })
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
    
          await order.deleteOne({ _id: orderId });
    
          res.json({ message: 'Order deleted' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    }
}

module.exports = OrderController;
