import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { PrismaClient, User } from '@prisma/client';

export const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let payload;

  if (!token) {
    return false;
  }

  const prisma = new PrismaClient();
  const session = await prisma.session.findFirst({
    where: {
      token: token.value,
      hasExpired: true,
    },
  });

  if (session) {
    cookieStore.delete('token');
    return false;
  }

  try {
    payload = jwt.verify(token.value, process.env.JWT_SECRET) as JwtPayload;
  } catch (e: any) {
    cookieStore.delete('token');
    return false;
  }

  const user = await prisma.user.findUnique({ where: { id: payload.id } });

  if (!user) {
    cookieStore.delete('token');
    return false;
  }

  return true;
};

export const getAuthUser = async (): Promise<User> => {
  const prisma = new PrismaClient();
  const cookieStore = cookies();
  const token = cookieStore.get('token') as RequestCookie;
  const payload = jwt.verify(token.value, process.env.JWT_SECRET) as JwtPayload;

  return (await prisma.user.findUnique({ where: { id: payload.id } })) as User;
};
