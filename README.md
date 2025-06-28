# Keploy_API

## 🌐 User Management API with Keploy Test Integration

This repository contains a Node.js RESTful API server for managing users, built with **Express** and **MongoDB**. It includes **unit**, **integration**, and **API tests** using **Keploy**, ensuring end-to-end reliability and correctness.

---

## 🚀 API Overview

The API provides endpoints to perform CRUD operations on users:

- `POST /api/users/create` → Create a new user  
- `GET /api/users/getallusers` → Retrieve all users  
- `PUT /api/users/update/:id` → Update a user by ID  
- `DELETE /api/users/delete/:id` → Delete a user by ID  

### 📦 Each user has the following fields:
- `name` (String, required)  
- `email` (String, required, unique)  
- `address` (String, required)  

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime  
- **Express** – Web framework for Node.js  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **Mocha, Chai** – Unit & integration testing  
- **Supertest** – API test assertions  
- **Nyc** – Code coverage tool  
- **Keploy** – Record-replay based API test automation with mocks  

---

## ⚙️ Getting Started

### 🔑 Prerequisites

- Node.js v16+
- MongoDB running locally or on Atlas

### 🧰 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/MishraAnisha/Keploy_API.git
cd Keploy_API

# Install dependencies
npm install
