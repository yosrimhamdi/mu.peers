'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

import FormikTextField from '@/app/components/FormikTextField';
import FormikContext from '@/app/components/FormikContext';
import { destroySession, signIn } from '@/redux/slices/auth-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import { signInValidator } from '@/validators/auth';

export interface SignInType {
  email: string;
  password: string;
}
const SignUp = () => {
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const loading = useAppSelector(state => state.auth.loading);
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.has('message')) {
      const message = searchParams.get('message');

      if (searchParams.get('status') === 'success') {
        toast.success(message);
        return;
      }

      toast.error(message);
    }
  }, [searchParams]);

  const onFormSubmit = async (formValues: SignInType) => {
    return dispatch(signIn(formValues))
      .then(unwrapResult)
      .then(response => {
        if (response.data.user.firstName) {
          return router.push('/dashboard');
        }

        router.push('/user-profile');
      })
      .catch((e: any) => {
        if (e.message === 'has session') {
          setIsModalOpen(true);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onFormSubmit,
    validationSchema: signInValidator,
  });

  const checkSession = () => {
    const { email, password } = formik.values;
    dispatch(destroySession(email))
      .then(unwrapResult)
      .then(async () => {
        await onFormSubmit({ email, password });
        setIsModalOpen(false);
      });
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center  pb-10 ">
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are already authenticated on another device
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Do you want to log out of the other device?
          </Typography>
          <LoadingButton
            loading={loading}
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={checkSession}
          >
            Yes
          </LoadingButton>
          <Button
            disabled={loading}
            variant="contained"
            onClick={() => setIsModalOpen(false)}
          >
            No
          </Button>
        </Box>
      </Modal>
      <div className="w-[85vw] md:w-[500px]  flex flex-col justify-between items-center shadow-md pb-4  ">
        <div className="w-full h-[80px] bg-gradient-to-r from-cyan-700 to-cyan-800 flex justify-center items-center">
          <h2 className="text-white font-bold text-xl">
            Happy to see you again
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mb-[10px] mt-[10px]">
          <span>Still not registered?</span>
          <Link
            href="/"
            className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center"
          >
            Register
          </Link>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <Box
            component="form"
            className="w-full flex flex-col justify-center items-center gap-[30px]"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ px: 6 }}
          >
            <FormikContext.Provider value={formik}>
              <FormikTextField name="email" label="Email adresse" />
              <FormikTextField
                name="password"
                label="Password"
                type="password"
              />
            </FormikContext.Provider>
            <LoadingButton
              className="normal-case transition duration-100 ease w-[180px] h-[45px]  bg-gradient-to-r from-sky-800 to-cyan-700 text-white shadow-2xl font-bold hover:brightness-105 hover:scale-[1.02]"
              type="submit"
              loading={loading}
              sx={{ color: 'white' }}
            >
              Login
            </LoadingButton>
          </Box>
          <Link
            href="/forgot-password"
            className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center"
          >
            I forgot my password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
