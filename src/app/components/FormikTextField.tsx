import { useContext, useState } from 'react';
import {
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import FormikContext from './FormikContext';

interface FormikTextFieldProps {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (...args: any) => void;
  required?: boolean;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  label,
  name,
  type = 'text',
  onChange = () => {},
  loading = false,
  disabled = false,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useContext(FormikContext);
  const { handleBlur, handleChange, touched, errors, values } = formik;

  const onInputChange = (...args: any): void => {
    handleChange(...args);
    onChange(...args);
  };

  let endAdornment = null;

  if (type === 'password') {
    endAdornment = (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  } else if (loading) {
    endAdornment = <CircularProgress size={20} />;
  }

  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      type={showPassword ? 'text' : type}
      id={name}
      label={label}
      name={name}
      value={values[name]}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
      onChange={onInputChange}
      onBlur={handleBlur}
      InputProps={{ endAdornment }}
      disabled={disabled}
    />
  );
};

export default FormikTextField;
