const express = require('express');
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/edit/:id', AuthMiddleware(['admin', 'user']), UserController.edit);
router.delete('/delete/:id', AuthMiddleware(['admin', 'user']), UserController.delete);

module.exports = router;
