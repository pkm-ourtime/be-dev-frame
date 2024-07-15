const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

db.connect();

const productRoutes = require('./app/routes/productRoutes');
const categoryRoutes = require('./app/routes/categoryRoutes');
const userRoutes = require('./app/routes/userRoutes');
const fileRoutes = require('./app/routes/fileRoutes');
const cartRoutes = require('./app/routes/cartRoutes');

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/files', fileRoutes);
app.use('/cart', cartRoutes);
app.use('')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
