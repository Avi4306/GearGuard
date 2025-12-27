const express = require('express');
const Eqrouter = express.Router();
const equipmentController = require('../Contollers/equipment.controller');

Eqrouter.post('/', equipmentController.createEquipment);
Eqrouter.get('/', equipmentController.getAllEquipment);

// Smart Button Route
Eqrouter.get('/:id/maintenance-stats', equipmentController.getEquipmentStats);
module.exports = Eqrouter;