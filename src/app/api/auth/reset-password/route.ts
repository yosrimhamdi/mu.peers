import jsonResponse from '@/utils/json-response';
import { findUserById } from '../../../../../prisma/user';
import { hash, verify } from '@/utils/bcrypt';
import prisma from '../../../../../prisma';

export const POST = async (req: Request): Promise<Response> => {
  const { userId, token, password } = await req.json();

  const user = await findUserById(userId);

  if (!user) {
    return jsonResponse(400, { message: 'User not found' });
  }

  if (!(await verify(token, <string>user.resetPasswordToken))) {
    return jsonResponse(400, { message: 'Invalid Token' });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: await hash(password),
      resetPasswordToken: null,
    },
  });

  return jsonResponse(200, { message: 'Password changed successfully' });
};
