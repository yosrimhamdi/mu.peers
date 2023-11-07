import jsonResponse from '@/utils/json-response';
import { PrismaClient, User } from '@prisma/client';

export const POST = async (req: Request) => {
  const { email } = await req.json();

  const prisma = new PrismaClient();

  const user = (await prisma.user.findUnique({ where: { email } })) as User;
  await prisma.session.updateMany({
    where: {
      userId: user.id,
      hasExpired: false,
    },
    data: {
      hasExpired: true,
    },
  });

  return jsonResponse(200, { message: 'ok', status: -100 });
};
