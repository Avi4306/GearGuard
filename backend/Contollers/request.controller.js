const prisma = require('../config/prismaclient');

// CREATE Request
const createRequest = async (req, res) => {
  const { subject, type, equipmentId, technicianId, scheduledAt, duration } = req.body;

  try {
    const request = await prisma.maintenanceRequest.create({
      data: {
        subject,
        type,
        equipmentId: Number(equipmentId),
        technicianId: technicianId ? Number(technicianId) : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        duration: duration ? Number(duration) : null,
      },
      include: { equipment: true, technician: true },
    });
    res.status(201).json({ message: 'Request created', data: request });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// READ all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      include: { equipment: true, technician: true },
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// READ single request
const getRequestById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const request = await prisma.maintenanceRequest.findUnique({
      where: { id },
      include: { equipment: true, technician: true },
    });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE request
const updateRequest = async (req, res) => {
  const id = Number(req.params.id);
  const { subject, type, equipmentId, technicianId, scheduledAt, duration, status } = req.body;

  try {
    const request = await prisma.maintenanceRequest.update({
      where: { id },
      data: {
        subject,
        type,
        equipmentId: equipmentId ? Number(equipmentId) : undefined,
        technicianId: technicianId ? Number(technicianId) : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        duration: duration ? Number(duration) : undefined,
        status,
      },
      include: { equipment: true, technician: true },
    });
    res.json({ message: 'Request updated', data: request });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Request not found' });
    res.status(400).json({ error: err.message });
  }
};

// UPDATE request stage (status)
const updateStage = async (req, res) => {
  const id = Number(req.params.id);
  const { stage } = req.body;

  try {
    const request = await prisma.maintenanceRequest.update({
      where: { id },
      data: { status: stage },
      include: { equipment: true, technician: true },
    });
    res.json({ message: 'Stage updated', data: request });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Request not found' });
    res.status(400).json({ error: err.message });
  }
};

// ASSIGN technician
const assignTechnician = async (req, res) => {
  const id = Number(req.params.id);
  const { technicianId } = req.body;

  try {
    const request = await prisma.maintenanceRequest.update({
      where: { id },
      data: { technicianId: Number(technicianId) },
      include: { equipment: true, technician: true },
    });
    res.json({ message: 'Technician assigned', data: request });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Request not found' });
    res.status(400).json({ error: err.message });
  }
};

// DELETE request
const deleteRequest = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.maintenanceRequest.delete({ where: { id } });
    res.json({ message: 'Request deleted' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Request not found' });
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  updateStage,
  assignTechnician,
  deleteRequest,
};