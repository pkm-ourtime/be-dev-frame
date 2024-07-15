const { admin, storage } = require('../../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

class FileController {
  static async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const bucket = storage.bucket();
      const blob = bucket.file(uuidv4() + '-' + req.file.originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });

      blobStream.on('error', (error) => {
        console.error('Upload error:', error);
        res.status(500).send('Server error.');
      });

      blobStream.on('finish', () => {
        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.send({ filePath: fileUrl });
      });

      blobStream.end(req.file.buffer);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).send('Server error.');
    }
  }

  static async deleteFile(req, res) {
    const fileName = decodeURIComponent(req.params.fileName);
    const bucket = storage.bucket();
    const file = bucket.file(fileName);

    try {
      await file.delete();
      res.send({ message: 'File deleted successfully.' });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).send({ message: 'File deletion failed.', error });
    }
  }
}

module.exports = FileController;
