import { User } from '@prisma/client';
import prisma from '.';

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const findUserByEmail = async (
  email: string | undefined
): Promise<User | null> => {
  if (!email) {
    return null;
  }

  return await prisma.user.findUnique({ where: { email } });
};
