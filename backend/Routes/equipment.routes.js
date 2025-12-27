import express from 'express';
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  getEquipmentStats,
} from '../Contollers/equipment.controller.js';

const router = express.Router();

router.post('/equipment', createEquipment);
router.get('/equipment', getAllEquipment);
router.get('/equipment/:id', getEquipmentById);
router.put('/equipment/:id', updateEquipment);
router.delete('/equipment/:id', deleteEquipment);
router.get('/equipment/:id/maintenance-stats', getEquipmentStats);

export default router;