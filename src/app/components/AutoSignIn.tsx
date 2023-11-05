'use client';

import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

import { fetchAuthUser } from '@/redux/slices/auth-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import PageSpinner from './PageSpinner';

const AutoSignIn = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const loadingAuto = useAppSelector(state => state.auth.loadingAuto);

  useLayoutEffect(() => {
    dispatch(fetchAuthUser(null))
      .then(unwrapResult)
      .then(() => router.push('/dashboard'))
      .catch(() => router.push('/login'));
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
