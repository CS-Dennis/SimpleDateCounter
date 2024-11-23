import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function LoadingComponent() {
  const context = useContext(AppContext);
  return (
    <Box
      className={`${
        context.appTheme.isMatrixTheme
          ? 'bg-matrix_dark'
          : 'bg-matrix_white_green'
      }
        min-w-full min-h-full fixed`}
    >
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
        // onClick={}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
}
