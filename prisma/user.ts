import prisma from '.';

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
