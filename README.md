# 🛍️ KAI Shop 電商網站

這是一個全端電商網站專案，使用 React 建立前端 SPA，Express 作為後端 API，並搭配 MySQL 資料庫完成商品、會員與購物車等功能。此專案適合作為全端學習作品展示。

## 🧰 使用技術

### 前端
- React（使用 Vite 建立專案）
- React Router DOM（路由切換）
- CSS Modules（樣式模組化）

### 後端
- Node.js + Express
- MySQL（使用 `mysql2/promise`）
- bcryptjs（密碼加密）
- dotenv（環境變數管理）
- CORS（跨域處理）

---

## 🚀 功能介紹

### 🧑‍💼 會員系統
- 會員註冊 / 登入（含密碼加密）
- 查詢會員資料
- 刪除會員帳號

### 🛒 商品功能
- 顯示全部商品
- 篩選商品（依照分類 category）
- 新增商品（後台用途）
- 刪除商品

### 🛍️ 購物車功能
- 加入商品至購物車（相同商品會合併數量）
- 查詢會員購物車內容（含商品名稱、圖片、價格等資訊）

---

## 📁 資料夾結構

```text
專案根目錄/
├── my-react/              # 💻 React 前端專案
│   ├── public/            # 公開靜態資源（favicon、圖片等）
│   ├── src/
│   │   ├── assets/        # 圖片等靜態資源
│   │   ├── data/          # 模擬資料
│   │   ├── pages/         # 頁面元件（如首頁、購物車、會員中心）
│   │   ├── App.jsx        # App 主架構元件
│   │   ├── main.jsx       # React 進入點
│   │   └── xxx.module.css # 模組化樣式檔案
│   ├── index.html         # 前端入口 HTML
│   ├── vite.config.js     # Vite 設定檔
│   └── README.md          # 🔍 前端說明文件（此檔案）
├── server/                # 🌐 Express 後端伺服器
├── routes/                # API 路由模組（products, cart, members）
├── index.js               # 後端主伺服器進入點
├── .env                   # 環境變數（DB 設定等）
├── .gitignore             # Git 忽略設定
└── package.json           # 後端相依管理
```
