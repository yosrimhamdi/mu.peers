'use client';

import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const user = useAppSelector(state => state.auth.user);

    if (!user) {
      redirect('/login');
    }

    return <Component {...props} />;
  };
}
