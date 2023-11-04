import _ from 'lodash';
import { PrismaClient } from '@prisma/client';

import jsonResponse from '@/utils/json-response';
import { getAuthUser, isAuthenticated } from '@/utils/auth';
import { personalInfoValidator } from '@/validators/auth';
import { PersonalInfo } from '@/app/dashboard/page';

export const GET = async () => {
  if (!(await isAuthenticated())) {
    return jsonResponse(401, { message: 'Unauthorized' });
  }

  const user = await getAuthUser();

  return jsonResponse(200, { user: _.omit(user, 'password') });
};

export const POST = async (req: Request) => {
  const { firstName, lastName, company, phone, profession }: PersonalInfo =
    await req.json();

  if (!(await isAuthenticated())) {
    return jsonResponse(401, { message: 'Unauthorized' });
  }

  const user = await getAuthUser();

  const isValid = await personalInfoValidator.isValid({
    firstName,
    lastName,
    company,
    phone,
    profession,
  });

  if (!isValid) {
    return jsonResponse(400, { message: 'Invalid input(s)' });
  }

  const prisma = new PrismaClient();
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName,
      lastName,
      phone,
      company,
      profession,
    },
  });

  return jsonResponse(200, { user: updatedUser });
};
