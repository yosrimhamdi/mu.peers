import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

export const GET = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const prisma = new PrismaClient();
  await prisma.session.updateMany({
    where: {
      token: token?.value,
    },
    data: {
      hasExpired: true,
    },
  });

  cookieStore.delete('token');

  return new Response();
};
