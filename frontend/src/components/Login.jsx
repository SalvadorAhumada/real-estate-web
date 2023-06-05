import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { OtherContext } from "../Context/OtherContext";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import TextField from '@mui/material/TextField';

function Login() {

  const navigate = useNavigate();

  const { POST_USER } = useContext(UserContext);

  const {
    REDIRECT_TO,
    SET_TOKEN,
    TOKEN
  } = useContext(OtherContext);

  useEffect(() => {
    if (typeof TOKEN === 'string') REDIRECT_TO("/main", navigate);
  })


  const handleSubmit = async (event) => {

    event.preventDefault();

    const fakeData = {
      email: "ahumada1790@gmail.com",
      password: "password01"
    }

    let response = await POST_USER(fakeData);

    if (response.ok) {
      SET_TOKEN(response.token);
      REDIRECT_TO("/main", navigate);
    }
  };

  return (
    <div className="login">
      <Card sx={{ width: 400, borderRadius: 0 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/img/placeholder.jpg"
          title="Cluster"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            CLUSTER
          </Typography>
          <TextField id="email" label="Correo Eletrónico" variant="standard" />
          <TextField id="password" label="Contraseña" type="password" variant="standard" />
        </CardContent>
        <CardActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button onClick={handleSubmit} variant="contained">Iniciar Sesión</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
