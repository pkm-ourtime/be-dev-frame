const Product = require('../models/Product');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createProduct(req, res) {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image_url: req.body.image_url,
      category: req.body.category,
      external_link: req.body.external_link,
    });

    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (req.body.name != null) {
        product.name = req.body.name;
      }
      if (req.body.description != null) {
        product.description = req.body.description;
      }
      if (req.body.price != null) {
        product.price = req.body.price;
      }
      if (req.body.image_url != null) {
        product.image_url = req.body.image_url;
      }
      if (req.body.category != null) {
        product.category = req.body.category;
      }
      if (req.body.external_link != null) {
        product.external_link = req.body.external_link;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product == null) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.deleteOne({ _id: productId });
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ProductController;
