import express from "express";
import { create, deleteUser, fetch, update } from "../controllers/userController.js";

const route = express.Router();

// GET all users
route.get("/", (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get all users'
     #swagger.responses[200] = {
       description: 'List of users'
     }
  */
  fetch(req, res);
});

// POST: Create a new user
route.post("/", (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Create a new user'
     #swagger.consumes = ['application/json']
     #swagger.parameters['user'] = {
       in: 'body',
       description: 'User data',
       required: true,
       schema: {
         name: 'Jenny',
         email: 'hello@gmail.com',
         address: 'London'
       }
     }
     #swagger.responses[201] = {
       description: 'User created successfully'
     }
  */
  create(req, res);
});

// PUT: Update user by ID
route.put("/:id", (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Update a user by ID'
     #swagger.consumes = ['application/json']
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'User ID',
       required: true,
       type: 'string'
     }
     #swagger.parameters['user'] = {
       in: 'body',
       description: 'Updated user data',
       required: true,
       schema: {
         name: 'Updated Name',
         email: 'updated@example.com',
         address: 'Updated City'
       }
     }
     #swagger.responses[201] = {
       description: 'User updated successfully'
     }
  */
  update(req, res);
});

// DELETE: Delete user by ID
route.delete("/:id", (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete a user by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'User ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[201] = {
       description: 'User deleted successfully'
     }
  */
  deleteUser(req, res);
});

export default route;
