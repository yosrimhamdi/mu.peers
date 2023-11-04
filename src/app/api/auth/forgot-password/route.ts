import { PrismaClient } from '@prisma/client';

import jsonResponse from '../../../../utils/json-response';
import { hash } from '@/utils/bcrypt';
import { sendResetPasswordEmail } from '@/emails';

export const POST = async (request: Request): Promise<Response> => {
  const { email }: { email: string | undefined } = await request.json();

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return jsonResponse(400, { message: 'Email not found' });
  }

  const token = crypto.randomUUID();
  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: await hash(token),
    },
  });

  await sendResetPasswordEmail(user, token);

  return jsonResponse(200, {
    message: "We sent you an email to reset you're password!",
  });
};
