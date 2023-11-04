import { isAuthenticated } from './utils/auth';
import jsonResponse from './utils/json-response';

export async function middleware() {
  if (!(await isAuthenticated())) {
    return jsonResponse(401, { message: 'Unauthorized' });
  }
}

export const config = {
  matcher: ['/api/auth/me'],
};
