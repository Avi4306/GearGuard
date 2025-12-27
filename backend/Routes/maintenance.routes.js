import express from 'express';
const router = express.Router();
import { 
  assignRequest, 
  startExecution, 
  completeRequest 
} from '../controllers/maintenanceController.js';

// 4. Assignment: Assign a technician to a specific ticket
router.patch('/requests/:id/assign', assignRequest);

// 5. Execution: Move the stage to "In Progress"
router.patch('/requests/:id/start', startExecution);

// 6. Completion: Record duration and move to "Repaired"
router.patch('/requests/:id/complete', completeRequest);

export default router;