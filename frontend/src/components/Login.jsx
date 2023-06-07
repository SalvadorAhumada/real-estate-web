import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { OtherContext } from "../Context/OtherContext";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import TextField from '@mui/material/TextField';

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

  useEffect(() => {
    if (TOKEN) REDIRECT_TO("/main", navigate);
  })

  const handleSubmit = async (event) => {

    event.preventDefault();

    let response = await POST_USER(formData);

    if(response.error) {
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

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
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
            <TextField id="email" name="email" label="Correo Eletrónico" variant="standard" onChange={handleChange} value={formData.email} sx={{width: '300px', margin:2}}/>
            <br />
            <TextField id="password" name="password" label="Contraseña" type="password" variant="standard" onChange={handleChange} value={formData.password} sx={{width: '300px', margin:2}} />
          </CardContent>
          <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button type="submit" onClick={handleSubmit} variant="contained">Iniciar Sesión</Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default Login;
