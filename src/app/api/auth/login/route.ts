import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { SignInType } from '@/app/login/page';
import jsonResponse from '@/utils/json-response';
import { signInValidator } from '@/validators/auth';
import { verify } from '@/utils/bcrypt';
import { cookies } from 'next/headers';
import _ from 'lodash';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email, password }: SignInType = await req.json();

  try {
    await signInValidator.validate({ email, password });
  } catch (e: any) {
    return jsonResponse(400, { message: e.message });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.isVerified) {
    return new Response('Account not verified');
  }

  if (!user || !(await verify(password, user.password))) {
    return jsonResponse(400, { message: 'Wrong email or password' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  cookies().set('token', token);

  return jsonResponse(200, { user: _.omit(user, 'password') });
};
