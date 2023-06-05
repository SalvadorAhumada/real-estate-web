import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { OtherContext } from "../Context/OtherContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const { POST_USER } = useContext(UserContext);
  
  const {
    REDIRECT_TO,
    SET_TOKEN
   } = useContext(OtherContext);
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();

    const fakeData = {
      email: "ahumada1790@gmail.com",
      password: "password01"
    }

    let response = await POST_USER(fakeData);

    if(response.ok) { 
      SET_TOKEN(response.token);
      REDIRECT_TO("/main", navigate);
    }
  };

  return (
    <div className="login">
      <form id="login" onSubmit={handleSubmit}>
        Correo:
        <input type="email" />
        Contraseña:
        <input type="password" />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default Login;
