import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@prisma/client';

import { findUserById } from '../../prisma/user';

const getAuthUser = async (): Promise<null | User> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let payload;

  if (!token) {
    return null;
  }

  try {
    payload = jwt.verify(token.value, process.env.JWT_SECRET);
  } catch (e: any) {
    cookieStore.delete('token');
    return null;
  }

  return await findUserById(payload.id);
};

export default getAuthUser;
