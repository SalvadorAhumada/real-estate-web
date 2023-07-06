import { useContext, useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { UserContext } from "../Context/UserContext";
import { OtherContext } from "../Context/OtherContext";
import './Login.css';

function Login({ navigate }) {

  const {
    POST_USER,
    SET_TOKEN,
    TOKEN
  } = useContext(UserContext);

  const {
    REDIRECT_TO,
    SET_SNACK
  } = useContext(OtherContext);

  useEffect(() => {
    if (TOKEN) REDIRECT_TO("/main", navigate);
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    let response = await POST_USER(formData);

    if (response.error) {
      SET_SNACK({
        value: true,
        message: response.msg,
        severity: 'error'
      });
    }

    if (response.ok) {
      SET_TOKEN(response.token);
      REDIRECT_TO("/main", navigate);
    }
  };

  const css = {
    card: { width: 400, borderRadius: 0 },
    heightFix: { height: 140 },
    flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Card sx={css.card}>
          <CardMedia
            sx={css.heightFix}
            image="/img/placeholder.jpg"
            title="Cluster"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              CLUSTER
            </Typography>
            <TextField id="email" name="email" label="Correo Electrónico" variant="standard" onChange={handleChange} value={formData.email} sx={{ width: '300px', margin: 2 }} />
            <br />
            <TextField autoComplete="on" id="password" name="password" label="Contraseña" type="password" variant="standard" onChange={handleChange} value={formData.password} sx={{ width: '300px', margin: 2 }} />
          </CardContent>
          <CardActions sx={css.flexCenter}>
            <Button type="submit" onClick={handleSubmit} variant="contained">Iniciar Sesión</Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default Login;
