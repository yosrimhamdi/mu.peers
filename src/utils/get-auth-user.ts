import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@prisma/client';

import { findUserById } from '../../prisma/user';
import prisma from '../../prisma';

const getAuthUser = async (): Promise<null | User> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let payload;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findFirst({
    where: {
      token: token.value,
      hasExpired: true,
    },
  });

  if (session) {
    cookieStore.delete('token');
    return null;
  }

  try {
    payload = jwt.verify(token.value, process.env.JWT_SECRET);
  } catch (e: any) {
    cookieStore.delete('token');
    return null;
  }

  const user = await findUserById(payload.id);

  if (!user) {
    cookieStore.delete('token');
    return null;
  }

  return user;
};

export default getAuthUser;
