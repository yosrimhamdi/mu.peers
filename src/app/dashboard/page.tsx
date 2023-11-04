'use client';

import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Box, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import SideBar from './components/SideBar';
import FormikTextField from '../components/FormikTextField';
import FormikContext from '../components/FormikContext';
import { useAppSelector, appDispatch } from '@/redux/store';
import { personalInfoValidator } from '@/validators/auth';
import { updatePersonalInfo } from '@/redux/slices/auth-slice';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  company?: string;
  profession?: string;
}

const Dashboard = () => {
  const [isOpen, setOpen] = useState(true);
  const dispatch = useDispatch<appDispatch>();
  const {
    user: { firstName, lastName, company, phone, profession },
    loading,
  } = useAppSelector(state => state.auth);

  const onFormSubmit = (formValues: PersonalInfo) => {
    dispatch(updatePersonalInfo(formValues))
      .then(unwrapResult)
      .then(() => toast.success('Updated'));
  };

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      company,
      phone,
      profession,
    },
    onSubmit: onFormSubmit,
    validationSchema: personalInfoValidator,
  });

  return (
    <div>
      <Header />
      <SideBar isOpen={isOpen} setOpen={setOpen} />
      <div
        className=" min-h-[max(675px,100vh-75px)] pb-[100px] min-w-full md:min-w-[calc(100%-250px)] p-4"
        style={{
          marginLeft: isOpen ? '250px' : 0,
          padding: '30px',
        }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ px: 6, pb: 6, pt: 2, width: '50%', boxShadow: 1 }}
        >
          <Typography variant="h4" marginBottom={2}>
            Personal information :{' '}
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
            variant="outlined"
            loading={loading}
            sx={{ mt: 2 }}
          >
            Save
          </LoadingButton>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
