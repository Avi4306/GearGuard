import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../Contollers/user.controller.js'; // Note: You may need the .js extension depending on your config

const Userrouter = express.Router();

// Routes
Userrouter.post('/add-users', createUser);
Userrouter.get('/users', getAllUsers);
Userrouter.get('/users/:id', getUserById);
Userrouter.put('/users/:id', updateUser);
Userrouter.delete('/users/:id', deleteUser);

export default Userrouter;