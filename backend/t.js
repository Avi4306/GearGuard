const prisma = require('./config/prismaclient');
const bcrypt = require('bcryptjs');

async function addUser() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@gearguard.com',
      password: await bcrypt.hash('password123', 10),
      role: 'technician',
    },
  });
  console.log('User created:', user);
}

addUser().catch(console.error).finally(() => prisma.$disconnect());