import { cookies } from 'next/headers';

export const GET = () => {
  const cookieStore = cookies();
  cookieStore.delete('token');

  return new Response();
};
