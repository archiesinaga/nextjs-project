import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash password untuk setiap user dengan password yang berbeda
  const hashedPasswordAdmin = await bcrypt.hash('admin', 10);
  const hashedPasswordManager = await bcrypt.hash('manager', 10);
  const hashedPasswordSupervisor = await bcrypt.hash('supervisor', 10);
  const hashedPasswordStandarisasi = await bcrypt.hash('standardization', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin User', 
        email: 'admin@example.com',
        password: "admin",
        role: 'SUPERVISOR' // Menggunakan SUPERVISOR sebagai role admin sementara
      },
      {
        name: 'Supervisor User',
        email: 'supervisor@example.com',
        password: hashedPasswordSupervisor,
        role: 'SUPERVISOR'
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: hashedPasswordManager,
        role: 'MANAGER'
      },
      {
        name: 'Standarisasi User',
        email: 'standarisasi@example.com',
        password: hashedPasswordhashedPasswordAdminStandarisasi,
        role: 'STANDARISASI'
      }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });