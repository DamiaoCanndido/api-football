import { PrismaClient } from '@prisma/client';
import { teams } from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.team.createMany({ data: teams });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
