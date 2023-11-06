'use client';

import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

import { fetchAuthUser } from '@/redux/slices/auth-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import PageSpinner from './PageSpinner';
import toast from 'react-hot-toast';

const AutoSignIn = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const loadingAuto = useAppSelector(state => state.auth.loadingAuto);

  useLayoutEffect(() => {
    if (Cookie.get('token')) {
      dispatch(fetchAuthUser(null))
        .then(unwrapResult)
        .then(() => router.push('/dashboard'))
        .catch(() => {
          toast('You have been  disconneced');
          router.push('/login');
        });
    }
  }, [dispatch, router]);

  if (loadingAuto) {
    return (
      <div>
        <PageSpinner />
        {children}
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AutoSignIn;
