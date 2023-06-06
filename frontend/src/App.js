import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { OtherContext } from "./Context/OtherContext";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "./Utils/ProtectedRoutes";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Users from "./Components/Users";
import NotFound from "./Components/Shared/NotFound";
import DetailList from './Components/DetailList';
import Navbar from "./Components/Navbar";
import './App.css';

function App() {

  const navigate = useNavigate();

  const {
    AUTHENTICATE_USER,
  } = useContext(OtherContext);

  useEffect(() => {
    AUTHENTICATE_USER();
  });

  return (
    <div className="App">
      <Navbar navigate={navigate} />
      <Routes>
        <Route element={<Navigate to="/login" replace />} path="/" />
        <Route element={<Login navigate={navigate} />} path="/login" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Main navigate={navigate} />} path="/main" exact />
          <Route element={<Navigate to="/login" replace />} path="/main/detail" exact />
          <Route element={<Users />} path="/users" exact />
          <Route element={<DetailList />} path="/main/detail/:clusterName" exact />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
