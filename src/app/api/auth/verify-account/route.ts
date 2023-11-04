import { PrismaClient, User } from '@prisma/client';

import { verify } from '@/utils/bcrypt';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  let user: User | null;
  const prisma = new PrismaClient();

  if (!token || !userId) {
    return new Response('Missing query param(s)');
  }

  try {
    user = await prisma.user.findUnique({ where: { id: userId } });
  } catch (e) {
    return new Response('User not found');
  }

  if (!user) {
    return new Response('User not found');
  }

  if (user.isVerified) {
    return new Response('Invalid token');
  }

  if (!verify(token, <string>user.verificationToken)) {
    return new Response('Invalid token');
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      verificationToken: null,
      isVerified: true,
    },
  });

  return new Response('Account verified');
};
