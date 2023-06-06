import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { OtherContext } from "../Context/OtherContext";
/* import { useNavigate } from "react-router-dom"; */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import TextField from '@mui/material/TextField';

function Login({ navigate }) {

/*   const navigate = useNavigate(); */

  const { POST_USER } = useContext(UserContext);

  const {
    REDIRECT_TO,
    SET_TOKEN,
    TOKEN
  } = useContext(OtherContext);

  const [formData, setFormData] = useState({
    email: 'ahumada1790@gmail.com',
    password: 'password01',
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
            <TextField id="email" name="email" label="Correo Eletrónico" variant="standard" onChange={handleChange} value={formData.email} />
            <TextField id="password" name="password" label="Contraseña" type="password" variant="standard" onChange={handleChange} value={formData.password} />
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
