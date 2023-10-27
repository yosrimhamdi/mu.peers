import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

import { signUpValidator } from '@/validators/auth';
import { SignUpType } from '@/app/page';
import jsonResponse from '@/utils/json-response';
import { hash } from '@/utils/bcrypt';
import { sendVerificationEmail } from '@/emails';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email, password, passwordConfirm }: SignUpType = await req.json();

  try {
    await signUpValidator.validate({ email, password, passwordConfirm });
    const verificationToken = crypto.randomUUID();
    const user = await prisma.user.create({
      data: {
        email,
        verificationToken: await hash(verificationToken),
        password: await hash(password),
      },
    });
    await sendVerificationEmail(user, verificationToken);
  } catch (e: any) {
    if (e.name === 'ValidationError') {
      return jsonResponse({ message: e.message, status: 400 });
    }

    if (
      e.name === 'PrismaClientKnownRequestError' &&
      e.meta.target === 'email_text'
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
