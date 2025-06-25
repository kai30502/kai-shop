const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

const productsRoutes = require('./routes/products');
const membersRoutes = require('./routes/members');
const cartRoutes = require('./routes/cart');

app.use('/api/products', productsRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/cart', cartRoutes);

// localhost關閉，改線上Railway Database
// app.listen(
//     port, () => {
//         console.log(`伺服器已啟動於 http://localhost:${port}`);
//     }
// )

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`伺服器啟動成功，運行於 port ${PORT}`);
});
