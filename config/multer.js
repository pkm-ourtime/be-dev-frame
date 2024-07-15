const multer = require('multer');

class MulterConfig {
  static getStorage() {
    return multer.memoryStorage();
  }

  static getUploader() {
    return multer({ storage: this.getStorage() });
  }
}

module.exports = MulterConfig;
