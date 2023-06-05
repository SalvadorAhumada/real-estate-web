import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import PrivateRoutes from "./Utils/ProtectedRoutes";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Users from "./Components/Users";
import { useContext, useEffect } from "react";
import { OtherContext } from "./Context/OtherContext";

function App() {
  const {
    AUTHENTICATE_USER,
  } = useContext(OtherContext);

  useEffect(() => {
    AUTHENTICATE_USER();
  });

  return (
    <div className="App">
      <Routes>
        <Route element={<Navigate to="/login" replace />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Main />} path="/main" exact />
          <Route element={<Users />} path="/users" exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
