# 🚀 URL Shortener App

A full-stack URL Shortening application built using **EJS**, **Node.js**, **Express.js**, and **MongoDB Atlas**.  
Includes **Signup/Login**, **JWT authentication**, **bcrypt password hashing**, and a clean UI rendered with **EJS templates**.

---

## 📘 Project Overview

This project allows users to generate short URLs after logging in.  
Built using **Node.js + Express**, UI in **EJS**, and database with **MongoDB Atlas**.

### ✔ Features
- 🔐 User Signup & Login with JWT  
- 🔒 Protected routes with authentication  
- 🔑 Password hashing using bcrypt  
- ✂ URL shortening with unique IDs  
- 📝 EJS template UI (home, login, signup)  
- 📦 MongoDB Atlas + Mongoose  
- 🌐 Works locally & after deployment

---

## ⚙️ How It Works

### 1. User Registration
- User signs up with name, email, password  
- Password hashed with bcrypt  
- JWT token created & stored in cookies  

### 2. User Login
- Password verified  
- JWT token issued  
- User redirected to **Home page**

### 3. URL Shortening
- User enters a long URL  
- Backend generates unique ID  
- Saves `{ originalUrl, shortUrl, userId }` in database  
- Shows short link: http://localhost:5000/url/abc123
- After deployment: https://bitly.up.railway.app/url/abc123
  
### 4. Redirect Logic
- Visiting the short URL redirects to original link  
- Implemented using `res.redirect()`

---

## 🛠 Tech Stack

### Frontend
- EJS Template Engine  
- HTML / CSS  

### Backend
- Node.js  
- Express.js  
- JWT Authentication  
- bcrypt  
- Cookie-parser 
- short-unique-id

### Database
- MongoDB Atlas  
- Mongoose  

---

## 📂 Project Structure

```

├── controllers/
├── middlewares/
├── models/
├── routes/
├── views/
  ├── styles/
    ├── home.css
│   ├── login.css
│   └── signup.css
│ ├── home.ejs
│ ├── login.ejs
│ └── signup.ejs
├── connect.js
├── index.js
├── package.json
└── README.md

````


---

## 🚀 Run Locally

### 1. Clone Repo
```

git clone https://github.com/Axl-2711/URL-Shortener-Project.git

```

### 2. Install Dependencies 

```
npm install

```
### 3. Create .env
```
MONGO_URI=your-mongodb-atlas-url
JWT_SECRET=your-secret
PORT=5000

```

### 4. Start App

```
npm start

```






