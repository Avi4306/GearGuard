import { prisma } from '../config/prismaclient.js';

// CREATE Team
const createTeam = async (req, res) => {
  const { name } = req.body;

  try {
    const team = await prisma.maintenanceTeam.create({
      data: { name },
      include: { members: { include: { user: true } } },
    });
    res.status(201).json({ message: 'Team created', data: team });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// READ all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.maintenanceTeam.findMany({
      include: { members: { include: { user: true } }, equipment: true },
    });
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// READ single team
const getTeamById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const team = await prisma.maintenanceTeam.findUnique({
      where: { id },
      include: { members: { include: { user: true } }, equipment: true },
    });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE team
const updateTeam = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const team = await prisma.maintenanceTeam.update({
      where: { id },
      data: { name },
      include: { members: { include: { user: true } } },
    });
    res.json({ message: 'Team updated', data: team });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Team not found' });
    res.status(400).json({ error: err.message });
  }
};

// DELETE team
const deleteTeam = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.maintenanceTeam.delete({ where: { id } });
    res.json({ message: 'Team deleted' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Team not found' });
    res.status(500).json({ error: err.message });
  }
};

// GET team members
const getMembers = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const team = await prisma.maintenanceTeam.findUnique({
      where: { id },
      include: { members: { include: { user: true } } },
    });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team.members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ADD member to team
const addMember = async (req, res) => {
  const teamId = Number(req.params.id);
  const { userId } = req.body;

  try {
    const member = await prisma.teamMember.create({
      data: { userId: Number(userId), teamId },
      include: { user: true },
    });
    res.status(201).json({ message: 'Member added', data: member });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// REMOVE member from team
const removeMember = async (req, res) => {
  const teamId = Number(req.params.id);
  const userId = Number(req.params.userId);

  try {
    await prisma.teamMember.delete({
      where: {
        userId_teamId: { userId, teamId },
      },
    });
    res.json({ message: 'Member removed' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') return res.status(404).json({ message: 'Team member not found' });
    res.status(500).json({ error: err.message });
  }
};

export {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  getMembers,
  addMember,
  removeMember,
};