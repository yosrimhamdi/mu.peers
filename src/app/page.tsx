'use client';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import FormikTextField from './components/FormikTextField';
import FormikContext from './components/FormikContext';
import { signUpValidator } from '../validators/auth';
import { signUp } from '@/redux/slices/auth-slice';
import { appDispatch } from '@/redux/store';

export interface SignUpType {
  email: string;
  password: string;
  passwordConfirm: string;
}
const SignUp = () => {
  const dispatch = useDispatch<appDispatch>();

  const onFormSubmit = (formValues: SignUpType): void => {
    dispatch(signUp(formValues));
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
            Inscrivez-vous et rejoignez l&apos;aventure
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mb-[10px] mt-[10px]">
          <span>Vous avez déjà un compte ?</span>
          <button className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center">
            Se connecter
          </button>
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
              <FormikTextField
                name="passwordConfirm"
                label="Confirmation mot de passe"
                type="password"
              />
            </FormikContext.Provider>
            <button
              className="transition duration-100 ease w-[200px] h-[50px]  bg-gradient-to-r from-sky-800 to-cyan-700 text-white shadow-2xl font-bold hover:brightness-105 hover:scale-[1.02]"
              type="submit"
            >
              Créer un compte
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
