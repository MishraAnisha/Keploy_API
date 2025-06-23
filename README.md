# Crud_Keploy-TEST

# User Management API

This repository contains a Node.js RESTful API server for managing users, built with Express and MongoDB. It includes unit, integration, and API tests to ensure reliability and correctness.

---

## API Overview

The API provides endpoints to perform CRUD operations on users:

- **Create User**: `POST /api/user/create`
- **Get All Users**: `GET /api/user/getallusers`
- **Update User**: `PUT /api/user/update/:id`
- **Delete User**: `DELETE /api/user/delete/:id`

Each user has the following fields:

- `name` (String, required)
- `email` (String, required, unique)
- `address` (String, required)

---

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Supertest** - HTTP assertions for testing APIs
- **Nyc** - Code coverage tool

---

## Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB (local or remote instance)

### Installation

1) Run npm install

2) Create .env file with PORT, MONGO_URL, MONGO_URL_TEST

3) Start MongoDB server

4) Run npm test


Testing Frameworks & Tools
Mocha: Test runner for asynchronous testing.

Chai: Provides human-readable assertions.

Supertest: Allows HTTP testing of Express routes.

Nyc: Generates code coverage reports.

Test Coverage
Achieved 100% passing tests for all API endpoints.

Code coverage report is generated using nyc.

Below is a screenshot of the test coverage:




<img width="503" alt="image" src="https://github.com/user-attachments/assets/16c81837-fe7f-47a7-aab8-324047e48dc8" />

