const express = require('express');
const router = express.Router();
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  getMembers,
  addMember,
  removeMember,
} = require('../Contollers/team.controller');

router.post('/teams', createTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.put('/teams/:id', updateTeam);
router.delete('/teams/:id', deleteTeam);
router.get('/teams/:id/members', getMembers);
router.post('/teams/:id/members', addMember);
router.delete('/teams/:id/members/:userId', removeMember);

module.exports = router;