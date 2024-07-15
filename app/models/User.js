const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

class UserClass {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async isPasswordValid(password) {
    return await bcrypt.compare(password, this.password);
  }
}

userSchema.loadClass(UserClass);

module.exports = mongoose.model('User', userSchema);
