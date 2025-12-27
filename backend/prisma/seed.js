import 'dotenv/config';
import pkg from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const { PrismaClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Teams
  const mechanics = await prisma.maintenanceTeam.create({
    data: { name: 'Mechanics' },
  });

  const it = await prisma.maintenanceTeam.create({
    data: { name: 'IT Support' },
  });

  // Users (with hashed passwords)
  const manager = await prisma.user.create({
    data: {
      name: 'Manager',
      email: 'manager@gearguard.com',
      password: await bcrypt.hash('managerpass', 10),
      role: 'manager',
    },
  });

  const tech = await prisma.user.create({
    data: {
      name: 'Technician',
      email: 'tech@gearguard.com',
      password: await bcrypt.hash('techpass', 10),
      role: 'technician',
    },
  });

  // Team membership
  await prisma.teamMember.create({
    data: {
      userId: tech.id,
      teamId: mechanics.id,
    },
  });

  // Equipment
  const cnc = await prisma.equipment.create({
    data: {
      name: 'CNC Machine 01',
      serialNumber: 'CNC-001',
      location: 'Shop Floor A',
      maintenanceTeamId: mechanics.id,
    },
  });

  // Maintenance Request
  await prisma.maintenanceRequest.create({
    data: {
      subject: 'Oil leakage',
      type: 'corrective',
      equipmentId: cnc.id,
    },
  });

  console.log('🌱 Database seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());