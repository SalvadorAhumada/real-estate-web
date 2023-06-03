import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { OtherContext } from "../Context/OtherContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { POST_USER } = useContext(UserContext);
  const { REDIRECT_TO } = useContext(OtherContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fakeData = {
      email: "salvador90@gmail.com",
      password: "salvador90"
    }
    const response = await POST_USER(fakeData);

    if(response.status === 201) {
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
