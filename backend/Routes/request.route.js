const express = require('express');
const router = express.Router();
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  updateStage,
  assignTechnician,
  deleteRequest,
} = require('../Contollers/request.controller');

router.post('/requests', createRequest);
router.get('/requests', getAllRequests);
router.get('/requests/:id', getRequestById);
router.put('/requests/:id', updateRequest);
router.patch('/requests/:id/stage', updateStage);
router.patch('/requests/:id/assign', assignTechnician);
router.delete('/requests/:id', deleteRequest);

module.exports = router;