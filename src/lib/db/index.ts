import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { LocalState } from './local-state';
dotenv.config();

// Предотвращаем создание множества экземпляров в режиме разработки
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const getDb = () => {
  if (process.env.USE_DB) {
    return globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }

  return new LocalState();
}

export const db = getDb();
