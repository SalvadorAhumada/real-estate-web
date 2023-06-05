import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './Context/UserContext';
import { OtherContextProvider } from './Context/OtherContext';
import Navbar from "./Components/Navbar";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OtherContextProvider>
      <UserContextProvider>
        <Navbar/>
        <Router>
          <App/>
        </Router>
      </UserContextProvider>
    </OtherContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


