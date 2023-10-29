'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { autoSignIn } from '@/redux/slices/auth-slice';
import { appDispatch } from '@/redux/store';

const AutoSignIn = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<appDispatch>();

  useEffect(() => {
    dispatch(autoSignIn());
  }, [dispatch]);

  return <div>{children}</div>;
};

export default AutoSignIn;
