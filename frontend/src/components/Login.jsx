import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button
} from '@mui/material';

function Login() {
  return (
    <div className="login">
      <FormControl>
        <InputLabel htmlFor="email">Email address</InputLabel>
        <Input id="email" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <Button>Enviar</Button>
    </div>
  );
}

export default Login;
