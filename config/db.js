const mongoose = require('mongoose');

const connect = () => {
  const DB_URL = `${process.env.MONGODB_URI}/${process.env.MONGODB_DBNAME}`
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
};

module.exports = { connect };
