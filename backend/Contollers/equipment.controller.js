const prisma = require('../config/prismaclient');

// 1. Create Equipment (Basic)
exports.createEquipment = async (req, res) => {
  try {
    const data = req.body;
    // Dates ko string se Date object me convert karna pad sakta hai agar frontend string bhej raha hai
    if(data.purchaseDate) data.purchaseDate = new Date(data.purchaseDate);
    if(data.warrantyEnd) data.warrantyEnd = new Date(data.warrantyEnd);

    const equipment = await prisma.equipment.create({ data });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get All Equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipments = await prisma.equipment.findMany({
      include: { maintenanceTeam: true } // Team ka naam bhi chahiye list me
    });
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. SMART BUTTON STATS API 
// GET /api/equipment/:id/maintenance-stats
exports.getEquipmentStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Count only OPEN requests (New or In Progress)
    const openRequestCount = await prisma.maintenanceRequest.count({
      where: {
        equipmentId: parseInt(id),
        status: {
          in: ['new', 'in_progress'] // Sirf active requests count karo
        }
      }
    });

    res.json({ 
      equipmentId: id,
      openRequests: openRequestCount 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};