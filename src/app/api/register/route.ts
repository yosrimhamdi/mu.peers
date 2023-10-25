import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { signUpValidator } from '@/validators/auth';
import { SignUpType } from '@/app/page';
import jsonResponse from '@/utils/json-response';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email, password, passwordConfirm }: SignUpType = await req.json();

  try {
    await signUpValidator.validate({ email, password, passwordConfirm });
    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(
          password,
          parseInt(process.env.BCRYPT_SALT)
        ),
      },
    });
  } catch (e: any) {
    if (e.name === 'ValidationError') {
      return jsonResponse({ message: e.message, status: 400 });
    }

    if (
      e.name === 'PrismaClientKnownRequestError' &&
      e.meta.target === 'User_email_key'
    ) {
      return jsonResponse({
        message: 'Email already exists',
        status: 400,
      });
    }

    return jsonResponse({
      message: 'Something went wrong. Try again later',
      status: 500,
    });
  }

  return jsonResponse({ message: 'Registration succeeded' });
};
