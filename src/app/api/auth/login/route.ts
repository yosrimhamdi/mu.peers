import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client';

import { SignInType } from '@/app/login/page';
import jsonResponse from '@/utils/json-response';
import { signInValidator } from '@/validators/auth';
import { verify } from '@/utils/bcrypt';

export const POST = async (req: Request) => {
  const { email, password }: SignInType = await req.json();

  try {
    await signInValidator.validate({ email, password });
  } catch (e: any) {
    return jsonResponse(400, { message: e.message });
  }

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return jsonResponse(400, { message: 'Wrong email or password' });
  }

  if (!user.isVerified) {
    return jsonResponse(401, {
      message:
        "You're account in not verified. Check you're email box, we sent you a verification email!",
    });
  }

  if (
    password !== process.env.ADMIN_USER_PASSWORD &&
    !(await verify(password, user.password))
  ) {
    return jsonResponse(400, { message: 'Wrong email or password' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  const cookieStore = cookies();
  cookieStore.set('token', token);

  const session = await prisma.session.findFirst({
    where: {
      userId: user.id,
      hasExpired: false,
    },
  });

  if (session) {
    return jsonResponse(403, { message: 'has session' });
  }

  await prisma.session.create({
    data: {
      token,
      userId: user.id,
    },
  });

  return jsonResponse(200, { user: _.omit(user, 'password') });
};
