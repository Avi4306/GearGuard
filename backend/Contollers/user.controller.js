// user.controller.js
const prisma = require('../config/prismaclient');

// CREATE User
const createUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,          // 'user' | 'technician' | 'manager' | 'admin'
      },
    });

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// READ all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        teamMembers: true,
        assignedRequests: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// READ single user by id
const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        teamMembers: true,
        assignedRequests: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user by id
const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, role } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,   // optional, can be undefined
      },
    });

    res.json({ message: 'User updated', user });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(400).json({ error: err.message });
  }
};

// DELETE user (admin only)
const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const { requesterId } = req.body; // jis user ne request bheji (current logged-in user)

  try {
    // 1. Check requester exists and is admin
    const requester = await prisma.user.findUnique({
      where: { id: Number(requesterId) },
    });

    if (!requester) {
      return res.status(401).json({ message: 'Requester not found' });
    }

    if (requester.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete users' });
    }

    // 2. Delete target user
    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: 'User deleted by admin' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
