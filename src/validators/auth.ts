import { object, ref, string } from 'yup';

const email = string().email('Invalid Email').required('Email is required');

const password = string()
  .required('Password is required')
  .min(8, 'The password is at least 8 characters')
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%§€£^&*()_+~\-=/\\[\]{}|;:",.<>?])/,
    'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  );

const passwordConfirm = string()
  .required('Confirmation password is required')
  .oneOf([ref('password')], 'Passwords do not match');

export const signUpValidator = object({
  email,
  password,
  passwordConfirm,
});

export const signInValidator = object({
  email,
  password: string().required('Password is required'),
});
