import 'dotenv/config';
import prismaClientPkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = prismaClientPkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error('DATABASE_URL is required to initialize PrismaClient');
}

const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString })
});

export default prisma;