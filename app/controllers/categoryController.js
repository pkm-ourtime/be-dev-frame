const Category = require('../models/Category')

class CategoryController {
  static async getAllCategories (req, res) {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async getCategoryById (req, res) {
    try {
      const category = await Category.findById(req.params.id)
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' })
      }
      res.json(category)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async createCategory (req, res) {
    const category = new Category({
      name: req.body.name,
      desc: req.body.desc
    })

    try {
      const newCategory = await category.save()
      res.status(201).json(newCategory)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async updateCategory (req, res) {
    try {
      const category = await Category.findById(req.params.id)
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' })
      }

      if (req.body.name != null) {
        category.name = req.body.name
      }
      if (req.body.desc != null) {
        category.desc = req.body.desc
      }

      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async deleteCategory (req, res) {
    try {
      const categoryId = req.params.id
      const category = await Category.findById(categoryId)
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' })
      }

      await category.deleteOne({ _id: categoryId })
      res.json({ message: 'Category deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = CategoryController
