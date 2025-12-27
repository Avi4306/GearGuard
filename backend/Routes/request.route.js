import express from 'express';
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  updateStage,
  assignTechnician,
  deleteRequest,
} from '../Contollers/request.controller.js';

const router = express.Router();

router.post('/requests', createRequest);
router.get('/requests', getAllRequests);
router.get('/requests/:id', getRequestById);
router.put('/requests/:id', updateRequest);
router.patch('/requests/:id/stage', updateStage);
router.patch('/requests/:id/assign', assignTechnician);
router.delete('/requests/:id', deleteRequest);

export default router;