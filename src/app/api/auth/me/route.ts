import _ from 'lodash';

import jsonResponse from '@/utils/json-response';
import getAuthUser from '@/utils/get-auth-user';

export const GET = async () => {
  const user = await getAuthUser();

  if (!user) {
    return jsonResponse(401, 'Unauthorized');
  }

  return jsonResponse(200, { user: _.omit(user, 'password') });
};
