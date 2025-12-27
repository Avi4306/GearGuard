const express = require('express');
const Userrouter = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../Contollers/user.controller');


// Routes
Userrouter.post('/add-users', createUser);
Userrouter.get('/users', getAllUsers);
Userrouter.get('/users/:id', getUserById);
Userrouter.put('/users/:id', updateUser);
Userrouter.delete('/users/:id', deleteUser);


module.exports = Userrouter;