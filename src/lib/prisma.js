import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
const prisma = new PrismaClient();
dotenv.config();

export default prisma;
export const PORT = process.env.PORT;
