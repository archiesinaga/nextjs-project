import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'supervisor@example.com',
        name: 'Supervisor User',
        password,
        role: 'SUPERVISOR'
      },
      {
        email: 'manager@example.com',
        name: 'Manager User',
        password,
        role: 'MANAGER'
      },
      {
        email: 'standarisasi@example.com',
        name: 'Standarisasi User',
        password,
        role: 'STANDARISASI'
      }
    ]
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
