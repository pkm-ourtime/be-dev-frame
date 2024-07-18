const express = require('express');
const FileController = require('../controllers/fileController');
const AuthMiddleware = require('../middleware/authMiddleware');
const MulterConfig = require('../../config/multer');

const router = express.Router();
const upload = MulterConfig.getUploader();

router.post('/upload', AuthMiddleware(['admin', 'user']), upload.single('file'), FileController.uploadFile);
router.delete('/delete/:fileName', AuthMiddleware(['admin', 'user']), FileController.deleteFile);

module.exports = router;
