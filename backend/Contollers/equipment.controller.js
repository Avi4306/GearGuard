const prisma = require('../config/prismaclient');

// CREATE Equipment
const createEquipment = async (req, res) => {
  const { name, serialNumber, location, maintenanceTeamId, status, purchaseDate, warrantyEnd, department, assignedTo } = req.body;

  try {
    const equipment = await prisma.equipment.create({
      data: {
        name,
        serialNumber,
        location,
        maintenanceTeamId: Number(maintenanceTeamId),
        status: status || 'active',
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        warrantyEnd: warrantyEnd ? new Date(warrantyEnd) : null,
        department,
        assignedTo,
      },
    });
    res.status(201).json({ message: 'Equipment created', data: equipment });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// READ all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      include: { maintenanceTeam: true, requests: true },
    });
    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// READ single equipment
const getEquipmentById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: { maintenanceTeam: true, requests: true },
    });
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE equipment
const updateEquipment = async (req, res) => {
  const id = Number(req.params.id);
  const { name, serialNumber, location, maintenanceTeamId, status, purchaseDate, warrantyEnd, department, assignedTo } = req.body;

  try {
    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        name,
        serialNumber,
        location,
        maintenanceTeamId: maintenanceTeamId ? Number(maintenanceTeamId) : undefined,
        status,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : undefined,
        warrantyEnd: warrantyEnd ? new Date(warrantyEnd) : undefined,
        department,
        assignedTo,
      },
    });
    res.json({ message: 'Equipment updated', data: equipment });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Equipment not found' });
    res.status(400).json({ error: err.message });
  }
};

// DELETE equipment
const deleteEquipment = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.equipment.delete({ where: { id } });
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Equipment not found' });
    res.status(500).json({ error: err.message });
  }
};

// GET equipment stats
const getEquipmentStats = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: { requests: true },
    });
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    
    const totalRequests = equipment.requests.length;
    const completedRequests = equipment.requests.filter(r => r.status === 'repaired').length;
    
    res.json({
      id: equipment.id,
      name: equipment.name,
      totalRequests,
      completedRequests,
      pendingRequests: totalRequests - completedRequests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  getEquipmentStats,
};