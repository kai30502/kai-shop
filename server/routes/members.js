const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const router = express.Router();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
};

// 查詢會員
router.get(
    '/:id', async (req, res) => {
        const memberId = req.params.id;
        let connection;
        try {
            connection = await mysql.createConnection(dbconfig);
            const query = `SELECT * FROM ${dbconfig.database}.members WHERE member_id = ?`;
            const [rows] = await connection.execute(query, [memberId]);

            if (rows.length === 0) {
                return res.status(404).json({ message: "會員不存在" });
            }

            const user = rows[0];
            res.status(200).json({
                id: user.member_id,
                username: user.username,
                email: user.email,
                full_name: user.full_name
            });
        } catch (err) {
            console.error("查詢會員失敗", err);
            res.status(500).send("查詢會員失敗");
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
);

// 會員登入
router.post(
    '/login', async (req, res) => {
        const { email, password } = req.body;
        let connection;
        try {
            connection = await mysql.createConnection(dbconfig);
            const query = `SELECT * FROM ${dbconfig.database}.members WHERE email = ?`;
            const [rows] = await connection.execute(query, [email]);

            if (rows.length === 0) {
                return res.status(401).json({ message: "使用者名稱或密碼錯誤" });
            }

            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "使用者名稱或密碼錯誤" });
            }

            res.status(200).json({
                id: user.member_id,
                username: user.username,
                email: user.email,
                full_name: user.full_name
            });
        } catch (err) {
            console.error("登入失敗", err);
            res.status(500).json({ message: "登入失敗" })
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
);

// 新增會員
router.post(
    '/add', (req, res) => {
        const { username , password , email , full_name } = req.body;
        const saltRounds = 10;
        bcrypt.hash( password, saltRounds, async (err, hash) => {
            if (err) {
                console.error("密碼加密失敗", err);
                return res.status(500).json({ message: "密碼加密失敗" });
            }
            
            let connection;
            try {
                connection = await mysql.createConnection(dbconfig);
                const query = `INSERT INTO ${dbconfig.database}.members (username, password_hash, email, full_name) VALUES (?, ?, ?, ?)`;
                const values = [username, hash, email, full_name];
                await connection.execute( query , values);
                res.status(201).json({ message: "會員新增成功" });
            } catch (err){
                console.log("會員新增失敗", err);
                res.status(500).json({ message: "會員新增失敗" });
            } finally{
                if (connection){
                    await connection.end();
                }
            }
        });

    }
)

// 刪除會員
router.delete(
    '/delete/:id', async (req, res) => {
        let connection;
        const memberId = req.params.id;
        try {
            if (!memberId) {
                return res.status(400).json({ message: "會員ID未提供" });
            }
            connection = await mysql.createConnection(dbconfig);
            connection.execute(
                `DELETE FROM ${dbconfig.database}.members WHERE (member_id = ?)`,
                [memberId]
            )
            res.status(200).json({ message: "會員刪除成功" });
        } catch (err) {
            console.log("會員刪除失敗", err);
            res.status(500).json({ message: "會員刪除失敗" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
)

module.exports = router;