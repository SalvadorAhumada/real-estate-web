import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "./Utils/ProtectedRoutes";
import Login from "./components/Login";
import Main from "./components/Main";
import Users from "./components/Users/Users";
import NotFound from "./components/Shared/NotFound";
import DetailList from './components/DetailList';
import Navbar from "./components/Navbar";
import './App.css';
import { UserContext } from "./Context/UserContext";
import Snack from './components/Shared/Snack';
import { OtherContext } from "./Context/OtherContext";

function App() {

  const navigate = useNavigate();

  const {
    AUTHENTICATE_USER,
  } = useContext(UserContext);

  const {
    SET_SNACK,
    REDIRECT_TO,
  } = useContext(OtherContext);
  

  useEffect(() => {
    AUTHENTICATE_USER().then((res) => {
      if(!window.location.href.includes("login") && !res.jwt) {
        SET_SNACK({
          value: true,
          message: 'Sesión caducada. Por favor inicie sesión nuevamente para continuar.',
          severity: 'error'
        })
        REDIRECT_TO("/login", navigate);
      }
    })
  }, []);

  return (
    <div className="App">
      <Navbar navigate={navigate} />
      <Routes>
        <Route element={<Navigate to="/login" replace />} path="/" exact />
        <Route element={<Login navigate={navigate} />} path="/login" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Main navigate={navigate} />} path="/main" exact />
          <Route element={<DetailList />} path="/main/detail/:clusterName" exact />
          <Route element={<Users />} path="/users" exact />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Snack/>
    </div>
  );
}

export default App;
