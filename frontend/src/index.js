import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login";
import Main from "./Components/Main";
import Users from "./Components/Users";
import { UserContextProvider } from './Context/UserContext';
import { OtherContextProvider } from './Context/OtherContext';
import PrivateRoutes from "./Utils/ProtectedRoutes";
import Navbar from "./Components/Navbar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OtherContextProvider>
      <UserContextProvider>
        <Navbar/>
        <Router>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<PrivateRoutes />}>
              <Route element={<Main />} path="/main" exact />
              <Route element={<Users />} path="/users" exact />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </OtherContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


