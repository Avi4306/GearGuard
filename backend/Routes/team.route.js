import express from 'express';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  getMembers,
  addMember,
  removeMember,
} from '../Contollers/team.controller.js';

const router = express.Router();

router.post('/teams', createTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.put('/teams/:id', updateTeam);
router.delete('/teams/:id', deleteTeam);
router.get('/teams/:id/members', getMembers);
router.post('/teams/:id/members', addMember);
router.delete('/teams/:id/members/:userId', removeMember);

export default router;