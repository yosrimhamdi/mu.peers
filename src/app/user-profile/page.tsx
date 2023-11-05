'use client';

import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Box, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import FormikTextField from '../components/FormikTextField';
import FormikContext from '../components/FormikContext';
import { useAppSelector, appDispatch } from '@/redux/store';
import { personalInfoValidator } from '@/validators/auth';
import { logout, updatePersonalInfo } from '@/redux/slices/auth-slice';
import Header from '../dashboard/components/Header';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  company?: string;
  profession?: string;
}

const UserProfile = () => {
  const dispatch = useDispatch<appDispatch>();
  const { loading, user } = useAppSelector(state => state.auth);
  const router = useRouter();

  const onFormSubmit = (formValues: PersonalInfo) => {
    dispatch(updatePersonalInfo(formValues))
      .then(unwrapResult)
      .then(() => {
        toast.success("You're profile information has been saved");
        router.push('/dashboard');
      });
  };

  const onLogoutClick = () => {
    dispatch(logout(null))
      .then(unwrapResult)
      .then(() => {
        router.push('/login');
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      company: user?.company ?? '',
      phone: user?.phone ?? '',
      profession: user?.profession ?? '',
    },
    onSubmit: onFormSubmit,
    validationSchema: personalInfoValidator,
  });

  return (
    <div>
      <Header />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
        sx={{ px: 6, pb: 6, pt: 2, width: '50%', boxShadow: 1, m: '4em auto' }}
      >
        <Typography variant="h4" marginBottom={2}>
          Set you&apos;re personal information:
        </Typography>
        <FormikContext.Provider value={formik}>
          <FormikTextField name="firstName" label="First Name" required />
          <FormikTextField name="lastName" label="Last Name" required />
          <FormikTextField name="company" label="Company" />
          <FormikTextField name="phone" label="Phone" required />
          <FormikTextField name="profession" label="Profession" />
        </FormikContext.Provider>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={{ mt: 2, mr: 1 }}
          style={{ backgroundColor: '#1976D2' }}
        >
          Save
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          loading={loading}
          sx={{ mt: 2 }}
          onClick={onLogoutClick}
        >
          Logout
        </LoadingButton>
      </Box>
    </div>
  );
};

export default UserProfile;
