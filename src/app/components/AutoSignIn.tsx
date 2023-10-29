'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

import { autoSignIn } from '@/redux/slices/auth-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import PageSpinner from './PageSpinner';

const AutoSignIn = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const loading = useAppSelector(state => state.authReducer.loading);

  useEffect(() => {
    dispatch(autoSignIn())
      .then(unwrapResult)
      .then(() => router.push('/dashboard'))
      .catch(() => router.push('/login'));
  }, [dispatch, router]);

  if (loading) {
    return <PageSpinner />;
  }

  return <div>{children}</div>;
};

export default AutoSignIn;
