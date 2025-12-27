import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// --- 4. Assignment Endpoint ---
// PATCH /api/requests/:id/assign
export const assignRequest = async (req, res) => {
  const { id } = req.params;
  const { technicianId } = req.body; // Sent by the manager or tech

  try {
    const updatedRequest = await prisma.maintenanceRequest.update({
      where: { id: parseInt(id) },
      data: {
        technicianId: technicianId,
        // Optional: you might want to set status to 'new' or keep as is
      },
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: "Failed to assign technician" });
  }
};

// --- 5. Execution Endpoint ---
// PATCH /api/requests/:id/start
export const startExecution = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRequest = await prisma.maintenanceRequest.update({
      where: { id: parseInt(id) },
      data: {
        status: 'in_progress',
        scheduledAt: new Date(), // Marks the actual start time
      },
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: "Failed to start request" });
  }
};

// --- 6. Completion Endpoint ---
// PATCH /api/requests/:id/complete
export const completeRequest = async (req, res) => {
  const { id } = req.params;
  const { duration } = req.body; // e.g., 2.5 (hours)

  try {
    const updatedRequest = await prisma.maintenanceRequest.update({
      where: { id: parseInt(id) },
      data: {
        status: 'repaired',
        duration: parseFloat(duration),
      },
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: "Failed to complete request" });
  }
};