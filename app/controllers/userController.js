const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

class UserController {
  static async register(req, res) {
    const { username, email, password, role } = req.body;
    
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await User.hashPassword(password);
      const newUser = await User.create({ username, email, password: hashedPassword, role });
      const token = jwt.sign({ id: newUser._id, username: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: '12h' });

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: `User ${email} doesn't exist` });
      }

      const isPasswordMatch = await user.isPasswordValid(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Your password is wrong' });
      }

      const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '12h' });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async edit(req, res) {
    const userId = req.params.id;
    const { username, email, newPassword, role } = req.body;
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (newPassword) {
        const hashedPassword = await User.hashPassword(newPassword);
        user.password = hashedPassword;
      }
      if (role) user.role = role;

      await user.save();

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    const userId = req.params.id;
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.deleteOne({ _id: userId });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
