// config/prismaclient.js
const { PrismaClient } = require('@prisma/client');  // ✅ yahi sahi import

const prisma = new PrismaClient();

module.exports = prisma;
