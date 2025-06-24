const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
};

// 加入購物車API
router.post(
    '/add', async (req, res) => {
        const { member_id, product_id, quantity } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(dbconfig);
            
            const [rows] = await connection.execute(
            'SELECT * FROM cart_items WHERE member_id = ? AND product_id = ?',
            [member_id, product_id]
            );
            if (rows.length > 0) {
            
                await connection.execute(
                    'UPDATE cart_items SET quantity = quantity + ? WHERE member_id = ? AND product_id = ?',
                    [quantity, member_id, product_id]
                );
                } else {
                
                await connection.execute(
                    'INSERT INTO cart_items (member_id, product_id, quantity) VALUES (?, ?, ?)',
                    [member_id, product_id, quantity]
                );
            }
            res.status(200).json({ message: '加入購物車成功' });
        } catch (err) {
            console.error('加入購物車失敗:', err);
            res.status(500).json({ message: '加入購物車失敗' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
)

// 取得購物車內容API
router.get('/items/:member_id', async (req, res) => {
  const { member_id } = req.params;
  let connection;
  try {
    connection = await mysql.createConnection(dbconfig);
    const [rows] = await connection.execute(
      `SELECT c.*, p.name, p.price, p.image_url
       FROM cart_items c
       JOIN products p ON c.product_id = p.product_id
       WHERE c.member_id = ?`,
      [member_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('查詢購物車失敗', err);
    res.status(500).json({ message: '查詢購物車失敗' });
  } finally {
    if (connection) await connection.end();
  }
});

// 更新購物車商品數量API
router.post('/update/:member_id/:product_id', async (req, res) => {
    const { member_id, product_id } = req.params;
    const { quantity } = req.body;
    let connection;

    try {
        connection = await mysql.createConnection(dbconfig);
        await connection.execute(
            'UPDATE cart_items SET quantity = ? WHERE member_id = ? AND product_id = ?',
            [quantity, member_id, product_id]
        );
        if (quantity === 0) {
            await connection.execute(
                'DELETE FROM cart_items WHERE member_id = ? AND product_id = ?',
                [member_id, product_id]
            );
        } else {
            await connection.execute(
                'UPDATE cart_items SET quantity = ? WHERE member_id = ? AND product_id = ?',
                [quantity, member_id, product_id]
            );
        }
        res.status(200).json({ message: '更新成功' });
    } catch (err) {
        console.error('更新失敗', err);
        res.status(500).json({ message: '更新失敗' });
    } finally {
        if (connection) await connection.end();
    }
});

module.exports = router;