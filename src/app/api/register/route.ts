import { PrismaClient } from '@prisma/client';
import { SignUpType } from '@/app/page';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email, password }: SignUpType = await req.json();

  const user = await prisma.user.create({ data: { email, password } });
  return Response.json(user);
};
