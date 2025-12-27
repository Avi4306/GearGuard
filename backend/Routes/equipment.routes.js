const express = require('express');
const router = express.Router();
const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  getEquipmentStats,
} = require('../Contollers/equipment.controller');

router.post('/equipment', createEquipment);
router.get('/equipment', getAllEquipment);
router.get('/equipment/:id', getEquipmentById);
router.put('/equipment/:id', updateEquipment);
router.delete('/equipment/:id', deleteEquipment);
router.get('/equipment/:id/maintenance-stats', getEquipmentStats);

module.exports = router;