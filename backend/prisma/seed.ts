import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { PrismaClient, Roles } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não foi definida.');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;

  const senha = process.env.ADMIN_PASSWORD;

  if (!email || !senha) {
    throw new Error('Variáveis de ambiente faltando.');
  }

  const password = await bcrypt.hash(senha, 10);

  await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      name: 'Administrador',
      email,
      password,
      role: Roles.ADMIN,
      isActive: true,
    },
  });

  console.log('Usuário administrador criado ou já existente.');
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
