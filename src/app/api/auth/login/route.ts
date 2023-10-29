import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import _ from 'lodash';

import { SignInType } from '@/app/login/page';
import jsonResponse from '@/utils/json-response';
import { signInValidator } from '@/validators/auth';
import { verify } from '@/utils/bcrypt';
import { findUserByEmail } from '../../../../../prisma/user';

export const POST = async (req: Request) => {
  const { email, password }: SignInType = await req.json();

  try {
    await signInValidator.validate({ email, password });
  } catch (e: any) {
    return jsonResponse(400, { message: e.message });
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return jsonResponse(400, { message: 'Wrong email or password' });
  }

  if (!user.isVerified) {
    return jsonResponse(401, { message: 'Account not verified' });
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

  return jsonResponse(200, { user: _.omit(user, 'password') });
};
