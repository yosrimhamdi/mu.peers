'use client';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

import FormikTextField from '@/app/components/FormikTextField';
import FormikContext from '@/app/components/FormikContext';
import { signIn } from '@/redux/slices/auth-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import { signInValidator } from '@/validators/auth';

export interface SignInType {
  email: string;
  password: string;
}
const SignUp = () => {
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const loading = useAppSelector(state => state.authReducer.loading);

  const onFormSubmit = (formValues: SignInType): void => {
    dispatch(signIn(formValues))
      .then(unwrapResult)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((e: any) => toast.error(e.message));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onFormSubmit,
    validationSchema: signInValidator,
  });

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center  pb-10 ">
      <div className="w-[85vw] md:w-[500px]  flex flex-col justify-between items-center shadow-md pb-4  ">
        <div className="w-full h-[80px] bg-gradient-to-r from-cyan-700 to-cyan-800 flex justify-center items-center">
          <h2 className="text-white font-bold text-xl">
            Heureux de vous revoir
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mb-[10px] mt-[10px]">
          <span>Toujours pas inscrit ?</span>
          <Link
            href="/"
            className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center"
          >
            S&apos;inscrire
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
              <FormikTextField name="email" label="Adresse Email" />
              <FormikTextField
                name="password"
                label="Mot de passe"
                type="password"
              />
            </FormikContext.Provider>
            <LoadingButton
              className="normal-case transition duration-100 ease w-[180px] h-[45px]  bg-gradient-to-r from-sky-800 to-cyan-700 text-white shadow-2xl font-bold hover:brightness-105 hover:scale-[1.02]"
              type="submit"
              loading={loading}
            >
              Se connecter
            </LoadingButton>
          </Box>
          <button className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center">
            J&apos;ai oublié mon mot de passe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
