const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// 取得商品列表API
router.get('/', async (req, res) => {
    const { category } = req.query;
    let connection;

    try {
        connection = await mysql.createConnection(dbconfig);
        let sql = 'SELECT * FROM products';
        if (category) {
            sql += ' WHERE category = ?';
        }
        const [rows] = await connection.execute(sql, [category]);
        res.json(rows);
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 新增商品API
router.post('/add', async (req, res) => {
    const { product_id, name, price, description, image_url, category } = req.body;
    let connection;

    try {
        connection = await mysql.createConnection(dbconfig);
        const query = `INSERT INTO products (product_id, name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            product_id,
            name,
            price,
            description,
            image_url,
            category
        ];
        await connection.execute(query, values);
        res.status(201).json({message : "商品新增成功"});
    } catch (err) {
        console.log("新增商品失敗", err);
        res.status(500).json({message : "新增商品失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 刪除商品API
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        connection = await mysql.createConnection(dbconfig);
        const query = `DELETE FROM products WHERE product_id = ?`;
        await connection.execute(query, [id]);
        res.status(200).send("商品刪除成功");
    } catch (err) {
        console.log("刪除商品失敗", err);
        res.status(500).send("刪除商品失敗");
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

module.exports = router;