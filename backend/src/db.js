import pkg from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config"; 
const { PrismaClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false // IMPORTANT for local Postgres
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter
});