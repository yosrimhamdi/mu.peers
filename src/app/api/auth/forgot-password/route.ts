import jsonResponse from '../../../../utils/json-response';
import { findUserByEmail } from '../../../../../prisma/user';
import prisma from '../../../../../prisma';
import { hash } from '@/utils/bcrypt';
import { sendResetPasswordEmail } from '@/emails';

export const POST = async (request: Request): Promise<Response> => {
  const { email }: { email: string | undefined } = await request.json();

  const user = await findUserByEmail(email);

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
