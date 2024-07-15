const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

class CartClass {
    
}

cartSchema.loadClass(CartClass);

module.exports = mongoose.model('Cart', cartSchema);
