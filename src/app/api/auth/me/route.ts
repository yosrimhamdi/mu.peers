import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import jsonResponse from '@/utils/json-response';
import { findUserById } from '../../../../../prisma/user';

export const GET = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return jsonResponse(401, 'Unauthorized');
  }

  let payload;

  try {
    payload = jwt.verify(token.value, process.env.JWT_SECRET);
  } catch (e: any) {
    return jsonResponse(401, 'Unauthorized');
  }

  const user = await findUserById(payload.id);

  if (!user) {
    return jsonResponse(401, 'Unauthorized');
  }

  return jsonResponse(200, _.omit(user, 'password'));
};
