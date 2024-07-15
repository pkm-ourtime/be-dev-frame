const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

class CategoryClass {
  
}

categorySchema.loadClass(CategoryClass);
module.exports = mongoose.model('Category', categorySchema);
