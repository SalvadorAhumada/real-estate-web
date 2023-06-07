import { forwardRef, useContext } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { OtherContext } from "../../Context/OtherContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const {
    SNACK, 
    SET_SNACK
  } = useContext(OtherContext);

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    SET_SNACK({
      value: false,
      message: '',
      severity: SNACK.severity
    });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={SNACK.value} onClose={handleClose}>
        <Alert onClose={handleClose} severity={SNACK.severity} sx={{ width: '100%' }}>
          {SNACK.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}