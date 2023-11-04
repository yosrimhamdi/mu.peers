import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

import { signUpValidator } from '@/validators/auth';
import { SignUpType } from '@/app/page';
import jsonResponse from '@/utils/json-response';
import { hash } from '@/utils/bcrypt';
import { sendVerificationEmail } from '@/emails';

export const POST = async (req: Request) => {
  const { email, password, passwordConfirm }: SignUpType = await req.json();

  try {
    await signUpValidator.validate({ email, password, passwordConfirm });
    const verificationToken = crypto.randomUUID();
    const prisma = new PrismaClient();
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
      return jsonResponse(400, { message: e.message });
    }

    if (
      e.name === 'PrismaClientKnownRequestError' &&
      e.meta.target === 'email_text'
    ) {
      return jsonResponse(400, { message: 'Email already exists' });
    }

    return jsonResponse(500, {
      message: 'Something went wrong. Try again later',
    });
  }

  return jsonResponse(201, {
    message: 'Registration succeeded. We sent you an email for verification',
  });
};
