'use client';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

import FormikTextField from './components/FormikTextField';
import FormikContext from './components/FormikContext';
import { signUp } from '@/redux/slices/auth-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import { signUpValidator } from '@/validators/auth';

export interface SignUpType {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const loading = useAppSelector(state => state.auth.loading);

  const onFormSubmit = (formValues: SignUpType): void => {
    dispatch(signUp(formValues))
      .then(unwrapResult)
      .then(response => {
        toast.success(response.data.message);
        router.push('/login');
      })
      .catch((e: any) => toast.error(e.message));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: onFormSubmit,
    validationSchema: signUpValidator,
  });

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center  pb-10 ">
      <div className="w-[85vw] md:w-[500px]  flex flex-col justify-between items-center shadow-md pb-4  ">
        <div className="w-full h-[80px] bg-gradient-to-r from-cyan-700 to-cyan-800 flex justify-center items-center">
          <h2 className="text-white font-bold text-xl">
            Sign up and join the adventure
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mb-[10px] mt-[10px]">
          <span>Already have an account ?</span>
          <Link
            href="/login"
            className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center"
          >
            Login
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
              <FormikTextField name="email" label="Email adresse " />
              <FormikTextField
                name="password"
                label="Password"
                type="password"
              />
              <FormikTextField
                name="passwordConfirm"
                label="Confirmation password"
                type="password"
              />
            </FormikContext.Provider>
            <LoadingButton
              className="normal-case transition duration-100 ease w-[180px] h-[45px]  bg-gradient-to-r from-sky-800 to-cyan-700 text-white shadow-2xl font-bold hover:brightness-105 hover:scale-[1.02]"
              type="submit"
              loading={loading}
            >
              Create an account
            </LoadingButton>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
