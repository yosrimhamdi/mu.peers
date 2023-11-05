import { Backdrop, CircularProgress } from '@mui/material';

const PageSpinner = () => {
  return (
    <Backdrop
      open
      sx={{
        // color: 'grey',
        bgcolor: '#00000038',
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default PageSpinner;
