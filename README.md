# Kai-Shop 電商網站

這是一個全端電商網站專案，使用React建立前端SPA，Express作為後端API，並搭配MySQL資料庫完成商品、購物車、會員等功能，此專案作為面試展示作品。

 [ 點我開啟網站](https://kai-shop-sooty.vercel.app/)  
(⚠️提示：因使用 Render 免費版，因此伺服器會進入休眠狀態，一段時間沒使用後須等約30秒重啟後端)


---

## 使用技術

### 前端
- React（ Vite 建立）
- React Router（SPA 路由）
- CSS Modules
- zxcvbn（檢測密碼強度）
- validator（欄位驗證）
- react-slick（首頁廣告輪播）
- Bootstrap

### 後端
- Node.js + Express
- MySQL（使用 `mysql2/promise`）
- bcryptjs（密碼加密）
- dotenv（環境變數）
- CORS（跨域處理）

---

## 功能介紹

### 會員系統

- 會員註冊 / 登入 / 登出
- 查詢會員資料
  
###  商品功能

- 商品依分類顯示（男裝 / 女裝 / 童裝）
- 商品卡片呈現圖片、價格、加入購物車按鈕

### 購物車功能

- 僅登入會員可操作
- 加入購物車（相同商品會累加數量）
- 修改購物車內商品數量
- 移除購物車內商品
- 計算總金額

---

## 部署資訊

| 項目       | 平台     | 狀態  |
|------------|----------|-------|
| 前端 | [Vercel](https://vercel.com/) | 已部署 |
| 後端 | [Render](https://render.com/) | 已部署 |
| 資料庫 | [Railway](https://railway.app/) | 已部署|

---

## 本地開發與執行方式

### 前端
> 請確認 fetch API 使用 `http://localhost:3000` 取代線上網址`https://kai-shop.onrender.com`

完成後執行
```bash
cd my-react
npm install
npm run dev
```

### 後端
> 確保有啟用 `index.js` 中的 `app.listen(...)` 並建立 `.env`

> 於`server`資料夾下新增`.env`檔案，內容如下
```ini
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_db
```
完成後執行
```bash
cd server
npm install
node index.js
```

### 建立資料表

```sql
CREATE TABLE members (
  member_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(100)
);

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2),
  description TEXT,
  image_url VARCHAR(255),
  category VARCHAR(50)
);

CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT 
NULL DEFAULT 1
);
```

---

## 📁 資料夾結構

  

```text
專案根目錄/
├── my-react/ 			# 前端專案
│ ├── public/ 			# 公開靜態資源
│ ├── src/ 				# 主要共用頁面元件（Header、Main、Footer等）
│ │ ├── assets 			# 圖片等靜態資源
│ │ ├── data/			# fetch 商品資料
│ │ ├── pages/			# 頁面元件（Home、Cart、Login等）
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── xxx.module.css 	# 模組化樣式檔案
│ ├── index.html
│ ├── vite.config.js
| ├── .gitignore
│ └── README.m
|
├── server/ 			# 後端專案
| ├── routes/ 			# API 路由模組（products、cart、members）
| ├── index.js 			# 後端主伺服器進入點
| ├── .env 				# 環境變數
| ├── .gitignore
│ └── package.json
|
└── README.md 			# 此檔案
```

---

##  學習紀錄

1. 了解網路與 Web 基礎概念（IP、DNS、RESTful API 等）
2. 回顧基礎 HTML、CSS、JavaScript 並加強 HTML 語意化
3. 深入接觸 JavaScript，包括 DOM 操作、Fetch、SPA、Promise
4. 使用 Node.js 與 npm，理解模組與後端環境
5. 使用 React，了解元件化、React 路由、props、state 等
6. 使用 Vite 建立前端開發環境，加快開發流程
7. 使用 Express，讓前後端使用共同語言
8. 建立 RESTful API、運用 Postman 測試  
9. 搭配 Git Copilot 增加開發速度
10. 使用 Bootstrap 改善 RWD
11. 使用雲端服務部署網站

---

##  聲明
- 本網站所用圖片均來自網路，僅用於練習展示，無商業用途
- 所有密碼皆經加密處理，開發者無法查看密碼
- 專案為個人練習作品，部分開發過程以 AI 輔佐提升效率
