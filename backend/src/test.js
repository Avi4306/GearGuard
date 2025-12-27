import { prisma } from "./db.js";
import "dotenv/config"; 
const users = await prisma.user.findMany();
console.log(users);

await prisma.$disconnect();
